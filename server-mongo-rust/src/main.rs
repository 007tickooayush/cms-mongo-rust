mod db;
mod model;
mod schema;
mod response;
mod error;
mod handlers;

use std::sync::Arc;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router, Server};
use axum::headers::Origin;
use axum::routing::post;
use dotenv::dotenv;
use http::{HeaderName, HeaderValue, Method};
use mongodb::bson::{Bson, doc, to_bson};
use mongodb::Client;
use serde::{Deserialize, Serialize};
// use mongodb::{options::ClientOptions, Client};
use serde_json::json;
use tower_http::cors::{AllowHeaders, AllowMethods, AllowOrigin, Any, Cors, CorsLayer};
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

    // let cors = CorsLayer::new()
    //     .allow_headers(AllowHeaders::list([HeaderName::from_static("Content-Type"), HeaderName::from_static("Authorization")]))
    //     .allow_methods(AllowMethods::list([Method::POST, Method::GET, Method::PUT, Method::DELETE]))
    //     .allow_origin(["*".parse().unwrap()]);


    let cors = CorsLayer::new()
        .allow_methods(AllowMethods::any())
        .allow_origin(AllowOrigin::any());

    const PORT:i32 = 4000;
    let app = Router::new()
        // .layer(_client)
        .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server", "status": "WORKING"}))).into_response() }))
        .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server", "status": "WORKING"}))).into_response() }))
        .with_state(Arc::new(AppState{ db: db.clone() }))
        .layer(cors)
        ;
        // .route("/student", post(create_document_student));

    println!("Server running on port {}", PORT);

    Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
