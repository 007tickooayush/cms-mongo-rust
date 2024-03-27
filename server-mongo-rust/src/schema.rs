use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Default)]
pub struct Filter {
    pub page: Option<usize>,
    pub limit: Option<usize>
}

#[derive(Deserialize,Debug)]
pub struct ParamOptions {
    pub id: String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateStudentSchema {
    pub name: String,
    pub uid: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub enrolled: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateStudentSchema {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub uid: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub enrolled: Option<bool>
}