mod db;
mod model;
mod schema;
mod response;
mod error;
mod handler;
mod routes;

use std::fmt::format;
use std::sync::Arc;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use axum::http::{HeaderValue, Method};
use axum::http::header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE};
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use crate::db::DB;
use crate::error::MyError;
use crate::routes::create_router;

pub struct AppState {
    db: DB
}

#[tokio::main]
async fn main() -> Result<(), MyError> {
    // Load the env file
    dotenv().ok();
    let test_token = std::env::var("TEST_TOKEN").expect("TEST_TOKEN must be set");
    println!("TEST_TOKEN env variable: {}",test_token);

    let db = DB::connect_mongo().await.unwrap();


    const PORT:i32 = 4000;
    let origin1 =std::env::var("ORIGIN1").unwrap_or_default();

    let cors = CorsLayer::new()
        .allow_origin(origin1.as_str().parse::<HeaderValue>().unwrap())
        // .allow_origin("*".as_str().parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET,Method::POST,Method::PATCH,Method::DELETE])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION,ACCEPT, CONTENT_TYPE]);

    let app = create_router(Arc::new( AppState { db: db.clone() }))
        .layer(cors);

    let listener = TcpListener::bind(format!("0.0.0.0:{}",PORT))
        .await
        .unwrap();

    println!("🚀🚀 Server Running on Post: {}",PORT);

    axum::serve(listener,app)
        .await
        .unwrap();


    // let app = Router::new()
    //     // .layer(_client)
    //     .route("/", get(|| async { (StatusCode::OK, Json(json!({"message": "Rust API Server", "status": "WORKING"}))).into_response() }))
    //     .route("/test", get(|| async { (StatusCode::OK,Json(json!({"message": "testing Rust Server", "status": "WORKING"}))).into_response() }))
    //     .with_state(Arc::new(AppState{ db: db.clone() }))
    //     ;
    //     // .route("/student", post(create_document_student));
    // println!("Server running on port {}", PORT);
    // Server::bind(&format!("0.0.0.0:{}", PORT).parse().unwrap())
    //     .serve(app.into_make_service())
    //     .await
    //     .unwrap();


    Ok(())
}
