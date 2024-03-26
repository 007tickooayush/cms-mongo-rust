use mongodb::{bson::{ Document }, options::ClientOptions, Client };
use mongodb::bson::Bson;

// use crate::student::Student;

pub async fn connect_mongo(db_url:String) -> Result<Client, mongodb::error::Error> {
    let client_options = ClientOptions::parse(db_url).await.unwrap();
    let client = Client::with_options(client_options).unwrap();

    Ok(client)
}


pub async fn create_collection(client:&Client, db_name:&str, coll_name: &str) {
    let db = client.database(db_name);
    db.create_collection(coll_name, None).await.expect("Unable to create Collection");
}

pub async fn insert_document(client: &Client, db_name:&str, coll_name: &str, document: &Document) -> Bson {
    let collection = client.database(db_name).collection::<Document>(coll_name);
    // let insert_result = collection.insert_one(document,None).await.unwrap().inserted_id;
    collection.insert_one(document,None).await.unwrap().inserted_id
}

// pub trait CRUD<T> {
//     fn _insert_document(&self,client:&Client, db_name:&str, coll_name: &str) -> T;
// }

// impl CRUD<Student> for Student {
//     pub async fn _insert_document(&self,client:&Client, db_name:&str, coll_name: &str) -> Student {
//         let db = client.database(db_name);
//         let collection = db.collection::<Student>(coll_name);
//         let student = Student::new();
//     }
// }

// pub async fn _insert_document<T>(client:&Client, db_name:&str, coll_name: &str) {
//     let db = client.database(db_name);
//     // let collection = 
// }