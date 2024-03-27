use chrono::Utc;
use mongodb::{bson, Client, Collection};
use mongodb::bson::{doc, Document, to_bson};
use mongodb::options::ClientOptions;
use serde_json::error::Category;
use crate::error::MyError;
use crate::error::MyError::MongoSerializeBsonError;
use crate::model::StudentModel;
use crate::response::StudentResponse;
use crate::schema::CreateStudentSchema;

type Result<T> = std::result::Result<T, MyError>;

#[derive(Debug, Clone)]
pub struct DB {
    pub students_collection: Collection<StudentModel>,
    pub collection: Collection<Document>
}

impl DB {

    pub async fn connect_mongo() -> Result<DB> { // Result<DB>
        let mongo_uri = std::env::var("DB_URL").expect("DB_URL must be set");

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
        let serialized_date = bson::to_bson(body).map_err(MongoSerializeBsonError).unwrap();
        let document = serialized_date.as_document();
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