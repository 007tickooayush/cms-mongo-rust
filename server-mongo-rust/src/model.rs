use chrono::prelude::*;
use mongodb::bson::DateTime;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[allow(non_snake_case)]
#[derive(Serialize,Deserialize,Debug, Clone)]
pub struct StudentModel{
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub name: String,
    pub uid: String,
    pub enrolled: Option<bool>,
    // #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub createdAt: DateTime,
    // #[serde(with = "bson::serde_helpers::chrono_datetime_as_bson_datetime")]
    pub updatedAt: DateTime
}

