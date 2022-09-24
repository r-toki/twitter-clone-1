use crate::application::jwt::Tokens;
use crate::modules::ModulesExt;
use crate::presentation::lib::error::Error;

use actix_web::{
    post,
    web::{Json, ServiceConfig},
};
use serde::Deserialize;

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(create);
}

#[derive(Debug, Deserialize)]
struct Create {
    name: String,
    password: String,
}

#[post("/users/registrations")]
async fn create(modules: ModulesExt, form: Json<Create>) -> Result<Json<Tokens>, Error> {
    modules
        .auth_service
        .sign_up(form.name.clone(), form.password.clone())
        .await
        .map(Json)
        .map_err(|e| e.into())
}
