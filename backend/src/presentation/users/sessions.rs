use super::super::lib::{
    error::Error,
    jwt_extractor::{AccessTokenDecoded, BearerToken, RefreshTokenDecoded},
};
use crate::application::jwt::Tokens;
use crate::modules::ModulesExt;

use actix_web::{
    delete, post, put,
    web::{Json, ServiceConfig},
};
use serde::Deserialize;

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(create);
    cfg.service(destroy);
    cfg.service(update);
}

#[derive(Debug, Deserialize)]
struct Create {
    name: String,
    password: String,
}

#[post("/users/sessions")]
async fn create(modules: ModulesExt, form: Json<Create>) -> Result<Json<Tokens>, Error> {
    modules
        .auth_command
        .sign_in(form.name.clone(), form.password.clone())
        .await
        .map(Json)
        .map_err(|e| e.into())
}

#[delete("/users/sessions")]
async fn destroy(
    modules: ModulesExt,
    access_token_decoded: AccessTokenDecoded,
) -> Result<Json<()>, Error> {
    modules
        .auth_command
        .sign_out(access_token_decoded.into())
        .await
        .map(Json)
        .map_err(|e| e.into())
}

#[put("/users/sessions")]
async fn update(
    modules: ModulesExt,
    refresh_token: BearerToken,
    refresh_token_decoded: RefreshTokenDecoded,
) -> Result<Json<Tokens>, Error> {
    modules
        .auth_command
        .refresh(refresh_token_decoded.into(), refresh_token.into())
        .await
        .map(Json)
        .map_err(|e| e.into())
}
