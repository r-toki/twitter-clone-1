use crate::presentation::lib::jwt_extractor::AccessTokenDecoded;

use actix_web::{
    get,
    web::{Json, ServiceConfig},
};
use derive_new::new;
use serde::Serialize;

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(index);
}

#[get("/")]
async fn index(_: AccessTokenDecoded) -> Json<Dto> {
    Json(Dto::new("HELLO WORLD!".into()))
}

#[derive(new, Debug, Serialize)]
struct Dto {
    message: String,
}
