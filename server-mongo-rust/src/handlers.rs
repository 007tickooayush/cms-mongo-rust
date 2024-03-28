use std::fmt::format;
use axum::http::StatusCode;
use axum::Json;
use axum::response::{ErrorResponse, IntoResponse};
use serde_json::json;
use crate::db::DB;
use crate::error::MyError;
use crate::response::GenericResponse;
use crate::schema::{CreateStudentSchema, Filter, UpdateStudentSchema};

pub async fn students_list_handler(filter: Filter, db: DB) -> impl IntoResponse {
    let limit = filter.limit.unwrap_or(10) as i64;
    let page = filter.page.unwrap_or(1) as i64;

    match db.fetch_students(limit, page).await {
        Ok(res) => (StatusCode::OK, Json(res)).into_response(),
        Err(err) => {
            let error = GenericResponse {
                status: "error".to_string(),
                message: err.to_string()
            };

            (StatusCode::INTERNAL_SERVER_ERROR, Json(error)).into_response()
        }
        // Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({
        //     "status": "error",
        //     "error": err.to_string()
        // }))).into_response()
    }
}

pub async fn create_student_handler(body: CreateStudentSchema, db: DB) -> impl IntoResponse {
    match db.create_student(&body).await {
        Ok(res) => (StatusCode::OK, Json(res)).into_response(),
        Err(err) => {
            let error = GenericResponse {
                status: "error".to_string(),
                message: err.to_string()
            };

            (StatusCode::INTERNAL_SERVER_ERROR, Json(error)).into_response()
        }
        // Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({
        //     "status": "error",
        //     "error": err.to_string()
        // }))).into_response()
    }
}

pub async fn get_student_handler(id: String, db: DB) -> impl IntoResponse {
    let not_found_resp = GenericResponse {
        status: "error".to_string(),
        message: format!("Student with ID: {} not found", id)
    };

    return match db.get_single_student(&id).await {
        Ok(res) => {
            if let Some(res) = res {
                (StatusCode::OK, Json(res)).into_response()
            } else {
                (StatusCode::NOT_FOUND, Json(not_found_resp)).into_response()
            }
        },
        Err(err) => {
            let error = GenericResponse {
                status: "error".to_string(),
                message: err.to_string()
            };

            (StatusCode::INTERNAL_SERVER_ERROR, Json(error)).into_response()
        }
    }
}

pub async fn edit_student_handler(id: String, body: UpdateStudentSchema, db: DB) -> impl IntoResponse {
    let not_found_resp = GenericResponse {
        status: "error".to_string(),
        message: format!("Student with ID: {} not found", id)
    };

    return match db.edit_student(&id, &body)
        .await {
        Ok(res) => {
            if let Some(res) = res {
                (StatusCode::OK, Json(res)).into_response()
            } else {
                (StatusCode::NOT_FOUND, Json(not_found_resp)).into_response()
            }
        },
        Err(err) => {
            let error = GenericResponse {
                status: "error".to_string(),
                message: err.to_string()
            };

            (StatusCode::INTERNAL_SERVER_ERROR, Json(error)).into_response()
        }
    }
}

pub async fn delete_student_handler(id: String, db: DB) -> impl IntoResponse {
    let not_found_resp = GenericResponse {
        status: "error".to_string(),
        message: format!("Student with ID: {} not found", id)
    };

    return match db.delete_student(&id).await {
        Ok(res) => {
            if let Some(res) = res {

                // (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": format!("deleted the entry with id: {}",&id)}))).into_response()
                (StatusCode::NOT_FOUND, Json(GenericResponse {
                    message: format!("Deleted the Student with id: {}",&id).to_string(),
                    status : "success".to_string()
                })).into_response()
            } else {
                (StatusCode::NOT_FOUND, Json(not_found_resp)).into_response()
            }

            // res.is_none() is handled
            // if res.is_none() {
            //     (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": format!("deleted the entry with id: {}",&id)}))).into_response()
            // }
        },
        Err(err) => {
            let error = GenericResponse {
                status: "error".to_string(),
                message: err.to_string()
            };

            (StatusCode::INTERNAL_SERVER_ERROR, Json(error)).into_response()
        }
    }
}