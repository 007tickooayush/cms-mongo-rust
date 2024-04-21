// use std::fmt::format;
use std::sync::Arc;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::Json;
use axum::response::IntoResponse;
// use serde_json::json;
use serde_json::{json, Value};
use crate::AppState;
// use crate::db::DB;
use crate::error::MyError;
// use crate::response::GenericResponse;
use crate::schema::{CreateStudentSchema, Filter, UpdateStudentSchema};



pub async fn student_list_handler(filter: Option<Query<Filter>>, State(app_state): State<Arc<AppState>>) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    let Query(filter) = filter.unwrap_or_default();

    let limit = filter.limit.unwrap_or(10) as i64;
    let page = filter.page.unwrap_or(1) as i64;

    match app_state
        .db
        .fetch_students(limit,page)
        .await
        .map_err(MyError::from) {
        Ok(res) => Ok(Json(res)),
        Err(e) => Err(e.into())
    }
}

pub async fn student_create_handler(State(app_state): State<Arc<AppState>>, Json(body): Json<CreateStudentSchema>) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    match app_state.db.create_student(&body).await.map_err(MyError::from) {
        Ok(res) => Ok(Json(res)),
        Err(e) => Err(e.into())
    }
}

pub async fn student_get_handler(Path(id): Path<String>, State(app_state): State<Arc<AppState>>) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    match app_state.db.get_single_student(&id).await.map_err(MyError::from) {
        Ok(res) => Ok(Json(res)),
        Err(e) => Err(e.into())
    }
}

pub async fn student_update_handler(Path(id): Path<String>, State(app_state): State<Arc<AppState>>, Json(body): Json<UpdateStudentSchema>,) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    match app_state.db.edit_student(&id, &body).await.map_err(MyError::from) {
        Ok(res) => Ok(Json(res)),
        Err(e) => Err(e.into())
    }
}

pub async fn student_delete_handler(Path(id): Path<String>, State(app_state): State<Arc<AppState>>) -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    match app_state.db.delete_student(&id).await.map_err(MyError::from) {
        Ok(res) => Ok(Json(res)),
        Err(e) => Err(e.into())
    }
}

pub async fn get_server_check() -> Result<impl IntoResponse, (StatusCode, Json<Value>)> {
    Ok((StatusCode::FOUND,Json(json!({"message": "Server running"}))))
}