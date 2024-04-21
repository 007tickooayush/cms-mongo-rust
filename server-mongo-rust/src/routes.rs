use std::sync::Arc;
use axum::Router;
use axum::routing::{get, post};
use crate::AppState;
use crate::handler::{get_server_check, student_create_handler, student_delete_handler, student_get_handler, student_list_handler, student_update_handler};

pub fn create_router(app_state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/", get(get_server_check))
        .route("/api/students/", post(student_create_handler))
        .route("/api/students", get(student_list_handler))
        .route(
            "/api/students/:id",
            get(student_get_handler)
                .patch(student_update_handler)
                .delete(student_delete_handler),
        )
        .with_state(app_state)
}