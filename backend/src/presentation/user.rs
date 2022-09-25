use super::lib::error::Error;
use crate::application::user_query::{FindUserDto, UserQuery};
use crate::modules::ModulesExt;
use crate::presentation::lib::jwt_extractor::AccessTokenDecoded;

use actix_web::{
    get,
    web::{Json, ServiceConfig},
};

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(index);
}

#[get("/user")]
async fn index(
    modules: ModulesExt,
    access_token_decoded: AccessTokenDecoded,
) -> Result<Json<FindUserDto>, Error> {
    modules
        .user_query
        .find(access_token_decoded.into())
        .await
        .map(Json)
        .map_err(|e| e.into())
}
