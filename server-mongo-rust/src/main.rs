
// use std::env;

use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use serde_json::json;

// const DB_URL: &str =env::var("DB_URL").unwrap_or("mongodb://localhost:27017".to_string());

async fn connect_mongo(db_url:String) -> Result<Client, mongodb::error::Error> {
    let client_options = ClientOptions::parse(db_url).await.unwrap();
    let client = Client::with_options(client_options).unwrap();

    Ok(client)
}


async fn _create_collection(client:&Client, db_name:&str, coll_name: &str) {
    let db = client.database(db_name);
    db.create_collection(coll_name, None).await.expect("Unable to create Collection");
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
