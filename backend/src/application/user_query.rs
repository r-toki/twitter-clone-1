use super::jwt::Auth;

use async_trait::async_trait;
use derive_new::new;
use serde::{Deserialize, Serialize};

#[async_trait]
pub trait UserQuery {
    async fn find(&self, auth: Auth) -> anyhow::Result<FindUserDto>;
}

#[derive(new, Debug, Serialize, Deserialize)]
pub struct FindUserDto {
    pub name: String,
}
