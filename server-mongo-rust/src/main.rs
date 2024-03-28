mod db;
mod model;
mod schema;
mod response;
mod error;

use std::sync::Arc;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router, Server};
use axum::routing::post;
use dotenv::dotenv;
use mongodb::bson::{Bson, doc, to_bson};
use mongodb::Client;
use serde::{Deserialize, Serialize};
// use mongodb::{options::ClientOptions, Client};
use serde_json::json;
use crate::db::DB;

pub struct AppState {
    db: DB
}

#[tokio::main]
async fn main() {
    // Load the env file
    dotenv().ok();
    let test_token = std::env::var("TEST_TOKEN").expect("TEST_TOKEN must be set");
    println!("TEST_TOKEN env variable: {}",test_token);

    let db = DB::connect_mongo().await.unwrap();


    const PORT:i32 = 4000;
    let app = Router::new()
        // .layer(_client)
        .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server", "status": "WORKING"}))).into_response() }))
        .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server", "status": "WORKING"}))).into_response() }))
        .with_state(Arc::new(AppState{ db: db.clone() }))
        ;
        // .route("/student", post(create_document_student));

    println!("Server running on port {}", PORT);

    Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
