use crate::application::jwt::Tokens;
use crate::modules::Modules;
use crate::presentation::lib::error::Error;

use actix_web::{
    post,
    web::{Data, Json, ServiceConfig},
};
use serde::Deserialize;
use std::sync::Arc;

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(create);
}

#[derive(Debug, Deserialize)]
struct Create {
    name: String,
    password: String,
}

#[post("/users/registrations")]
async fn create(modules: Data<Arc<Modules>>, body: Json<Create>) -> Result<Json<Tokens>, Error> {
    modules
        .auth_service
        .sign_up(body.name.to_owned(), body.password.to_owned())
        .await
        .map(Json)
        .map_err(|e| e.into())
}
