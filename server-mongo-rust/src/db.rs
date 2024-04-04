use std::str::FromStr;
use axum::body::HttpBody;
use bson::Bson::DateTime;
use chrono::Utc;
use futures::StreamExt;
use mongodb::{bson, Client, Collection, IndexModel};
use mongodb::bson::{doc, to_bson, Document, oid::ObjectId};
use mongodb::options::{ClientOptions, FindOneAndUpdateOptions, FindOptions, IndexOptions, ReturnDocument};
use serde_json::error::Category;
use crate::error::MyError;
use crate::error::MyError::{InvalidIDError, MongoDuplicateError, MongoQueryError, MongoSerializeBsonError, NotFoundError};
use crate::model::StudentModel;
use crate::response::{StudentData, StudentListResponse, StudentResponse, StudentSingleResponse};
use crate::schema::{CreateStudentSchema, UpdateStudentSchema};

type Result<T> = std::result::Result<T, MyError>;

#[derive(Clone, Debug)]
pub struct DB {
    pub students_collection: Collection<StudentModel>,
    pub collection: Collection<Document>
}

impl DB {

    pub async fn connect_mongo() -> Result<DB> { // Result<DB>
        let mongo_uri = std::env::var("DB_URL").unwrap_or("mongodb://localhost:27017/test".to_string());

        let db_name = std::env::var("MONGO_INITDB_DATABASE").expect("MONGO_INITDB_DATABASE must be set");

        let collection_name =  std::env::var("MONGODB_NOTE_COLLECTION").expect("MONGODB_NOTE_COLLECTION must be set");

        let mut client_options = ClientOptions::parse(mongo_uri).await.expect("Error connecting to Database");

        client_options.app_name = Some(db_name.to_string());

        let client = Client::with_options(client_options).unwrap();
        let database = client.database(db_name.as_str());

        let students_collection = database.collection(collection_name.as_str());
        let collection = database.collection::<Document>(collection_name.as_str());

        println!("Database connected successfully");

        Ok(DB {
            students_collection,
            collection
        })
    }

    fn doc_to_student(&self, student: &StudentModel) -> Result<StudentResponse> {
        let student_response =  StudentResponse {
            id: student.id.to_hex(),
            uid: student.uid.to_owned(),
            name: student.name.to_owned(),
            enrolled: student.enrolled.to_owned().unwrap(),
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
        };

        Ok(student_response)
    }

    fn create_student_doc(&self, body: &CreateStudentSchema, enrolled: bool) -> Result<Document> {
        let serialized_date = to_bson(body).map_err(MongoSerializeBsonError)?;
        let document = serialized_date.as_document().unwrap();
        let datetime = Utc::now();

        let mut doc_resp = doc! {
            "createdAt": datetime,
            "updatedAt": datetime,
            "enrolled": enrolled
        };

        doc_resp.extend(document.clone());

        Ok(doc_resp)
    }
}

/// CRUD Operations Functions
impl DB {
    pub async fn fetch_students(&self, limit:i64, page: i64) -> Result<StudentListResponse> {
        let filter = FindOptions::builder()
            .limit(limit)
            .skip(u64::try_from((page - 1) * limit).unwrap())
            .build();

        let mut student_cursor = self
            .students_collection
            .find(doc! {},filter)
            .await
            .map_err(MongoQueryError)
            .unwrap();

        let mut json_result: Vec<StudentResponse> = Vec::new();

        while let Some(doc) = student_cursor.next().await {
            json_result.push(self.doc_to_student(&doc.unwrap()).unwrap())
        };

        Ok(StudentListResponse {
            status: "success",
            results: json_result.len(),
            data: json_result
        })
    }

    pub async fn create_student(&self, body:&CreateStudentSchema) -> Result<StudentSingleResponse> {
        let enrolled = body.enrolled.to_owned().unwrap();

        let document = self.create_student_doc(body,enrolled).unwrap();

        let options = IndexOptions::builder().unique(true).build();

        let index = IndexModel::builder()
            .keys(doc! {"uid": 1, })
            .options(options)
            .build();

        match self.students_collection.create_index(index, None).await {
            Ok(_) => {}
            Err(err) => return Err(MongoQueryError(err)),
        };

        let insert_result = match self.collection.insert_one(&document,None).await {
            Ok(result) => result,
            Err(err) => {
                if err.to_string().contains("E110000 duplicate key error collection") {
                    return Err(MongoDuplicateError(err))
                }
                return Err(MongoQueryError(err))
            }
        };

        let new_id = insert_result.inserted_id.as_object_id().expect("issue with getting id");

        let student_doc = match self
            .students_collection
            .find_one(doc! {"_id": new_id}, None)
            .await {
            Ok(Some(doc)) => doc,
            Ok(None) => return Err(NotFoundError(new_id.to_string())),
            Err(err) => return Err(MongoQueryError(err))
        };

        Ok(StudentSingleResponse {
            status: "success",
            data: StudentData {
                student: self.doc_to_student(&student_doc).unwrap()
            }
        })
    }

    pub async fn get_single_student(&self, id:&str) -> Result<StudentSingleResponse> {
        let oid = ObjectId::from_str(id).map_err(|_| InvalidIDError(id.to_owned())).unwrap();

        let student_doc = self.students_collection
            .find_one(doc! {"_id": oid}, None)
            .await
            .map_err(MongoQueryError)
            .unwrap();
        match student_doc {
            Some(doc) => {
                let student = self.doc_to_student(&doc).unwrap();

                Ok(StudentSingleResponse {
                    status: "success",
                    data: StudentData { student }
                })
            },
            None => Err(NotFoundError(id.to_string()))
        }

    }

    pub async fn edit_student(&self, id:&str, body:&UpdateStudentSchema) -> Result<StudentSingleResponse> {
        let oid = ObjectId::from_str(id).map_err(|_| InvalidIDError(id.to_owned())).unwrap();


        let update = doc! {
            "$set": bson::to_document(body).map_err(MongoSerializeBsonError).unwrap(),
        };

        let options = FindOneAndUpdateOptions::builder()
            .return_document(ReturnDocument::After)
            .build();


        if let Some(doc) = self.students_collection
            .find_one_and_update(doc! {"_id": oid}, update, options)
            .await
            .map_err(MongoQueryError)
            .unwrap()
        {
            let student = self.doc_to_student(&doc).unwrap();
            let student_response = StudentSingleResponse {
                status: "success",
                data: StudentData {
                    student
                },
            };

            Ok(student_response)
        } else {
            Err(NotFoundError(id.to_string()))
        }
    }

    pub async fn delete_student(&self, id: &str) -> Result<()> {
        let oid = ObjectId::from_str(id).map_err(|_| InvalidIDError(id.to_owned())).unwrap();
        let filter = doc! {"_id": oid};

        let result = self.students_collection
            .delete_one(filter,None)
            .await
            .map_err(MongoQueryError)
            .unwrap();

        match result.deleted_count {
            0 => Err(NotFoundError(id.to_string())),
            _ => Ok(())
        }
    }
}