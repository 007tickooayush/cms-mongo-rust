use chrono::prelude::{DateTime, Utc};
use mongodb::bson;
// use mongodb::bson::oid::ObjectId
use serde::Serialize;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String
}


#[allow(non_snake_case)]
#[derive(Serialize, Debug)]
pub struct StudentResponse {
    pub id: String,
    pub name: String,
    pub uid: String,
    pub enrolled: bool,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub createdAt: DateTime<Utc>,
    #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub updatedAt: DateTime<Utc>,
}

#[derive(Serialize, Debug)]
pub struct StudentData {
    pub student: StudentResponse
}

#[derive(Serialize, Debug)]
pub struct StudentSingleResponse{
    pub status: &'static str,
    pub data: StudentData
}

#[derive(Serialize, Debug)]
pub struct StudentListResponse {
    pub status: &'static str,
    pub results: usize,
    pub data: Vec<StudentResponse>,
}