
// use std::env;

use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
// use chrono::format;
use mongodb::{options::{ClientOptions, ResolverConfig}, Client};
use serde_json::json;

// const DB_URL: &str =env::var("DB_URL").unwrap_or("mongodb://localhost:27017".to_string());

#[tokio::main]
async fn main() {
    const PORT:i32 = 4000;

    // let db_user = std::env::var("MONGO_INITDB_ROOT_USERNAME").unwrap_or("root".to_string());
    // let db_pass = std::env::var("MONGO_INITDB_ROOT_PASSWORD").unwrap_or("root".to_string());
    let db_host = "localhost:27020";
    let db_name = "CourseManagement_Rust";
    // let db_url = format!("mongodb://{}:{}@{}/{}", db_user, db_pass, db_host, db_name);
    let db_url = format!("mongodb://{}/{}",db_host,db_name);

    let options = ClientOptions::parse_with_resolver_config(db_url, ResolverConfig::cloudflare()).await.unwrap();

    let mongoClient = Client::with_options(options).unwrap();

    println!("Connected to MongoDB");


    let app = Router::new()
        .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server"}))).into_response() }))
        .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server"}))).into_response() }));

    println!("Server running on port {}", PORT);

    axum::Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
