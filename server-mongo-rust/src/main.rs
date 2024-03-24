
// use std::env;

use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde_json::json;

// const DB_URL: &str =env::var("DB_URL").unwrap_or("mongodb://localhost:27017".to_string());

#[tokio::main]
async fn main() {
    const PORT:i32 = 4000;

    let app = Router::new()
        .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server"}))).into_response() }))
        .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server"}))).into_response() }));

    println!("Server running on port {}", PORT);

    axum::Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
