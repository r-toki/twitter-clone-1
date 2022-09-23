mod application;
mod domain;
mod infrastructure;
mod modules;
mod presentation;

use crate::infrastructure::config::CONFIG;
use crate::modules::Modules;

use actix_cors::Cors;
use actix_web::{http, middleware::Logger, web::Data, App, HttpServer};
use dotenv::dotenv;
use sqlx::PgPool;
use std::sync::Arc;

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    let host = &CONFIG.host;
    let port = &CONFIG.port;
    let database_url = &CONFIG.database_url;
    let frontend_origin = &CONFIG.frontend_origin;

    let pool = PgPool::connect(database_url).await.unwrap();

    let modules = Arc::new(Modules::new(pool));

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&frontend_origin)
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![
                http::header::AUTHORIZATION,
                http::header::CONTENT_TYPE,
            ])
            .max_age(3_600);

        App::new()
            .app_data(Data::new(modules.clone()))
            .wrap(Logger::default())
            .wrap(cors)
            .configure(presentation::index::init)
            .configure(presentation::users::init)
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
