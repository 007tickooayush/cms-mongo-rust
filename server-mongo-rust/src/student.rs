// use mongodb::bson::Document;
use mongodb::bson::oid::ObjectId;
// use mongodb::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize,Deserialize,Debug)]
pub struct Student{
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub uid: String,
    pub email: String,
    pub courses: Vec<String>
}
impl Student {
    pub fn new() -> Student {
       Student {
        id: ObjectId::new(),
        uid: String::new(),
        email: String::new(),
        courses: vec![]
       } 
    }
}



// pub async fn insert_student(client:&Client, document: Document) {
//     let students = client.database("test").collection::<Student>("students");
//     let result = students.insert_one(document, None).await.expect("Unable to insert document");
// }