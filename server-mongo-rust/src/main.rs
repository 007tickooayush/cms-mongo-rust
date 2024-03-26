mod db;
mod student;

use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use dotenv::dotenv;
use mongodb::bson::doc;
// use mongodb::{options::ClientOptions, Client};
use serde_json::json;

use crate::db::connect_mongo;

struct CreateStudentReq<T> {
    uid: String,
    email: String,
    courses: Vec<T>
}
async fn create_document_student(Json(body): Json<CreateStudentReq<String>>) -> impl IntoResponse {

    // (StatusCode::CREATED, Json()).into_response()
}

#[tokio::main]
async fn main() {
    // Load the env file
    dotenv().ok();

    let test_token = std::env::var("TEST_TOKEN").expect("TEST_TOKEN must be set");

    println!("TEST_TOKEN env variable: {}",test_token);

    const PORT:i32 = 4000;
    
    let db_url = std::env::var("DB_URL").expect("DB_URL must be set");
    // println!("DB_URL is: {}",db_url.clone());

    let _client = connect_mongo(db_url)
        .await
        .expect("Could not connect to database");

    let app = Router::new()
        .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server"}))).into_response() }))
        .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server"}))).into_response() }));

    println!("Server running on port {}", PORT);

    axum::Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
