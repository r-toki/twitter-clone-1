use super::lib::{get_current_date_time, get_new_id};

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use validator::Validate;

#[derive(new, Debug, Validate)]
pub struct User {
    #[validate(length(min = 1))]
    pub id: String,
    #[validate(length(min = 3, max = 15))]
    pub name: String,
    #[validate(length(min = 1))]
    pub password_hash: String,
    #[validate(length(min = 1))]
    pub refresh_token_hash: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl User {
    pub fn create(
        name: String,
        password_hash: String,
        refresh_token_hash: Option<String>,
    ) -> anyhow::Result<Self> {
        let id = get_new_id();
        let now = get_current_date_time();
        let user = User::new(id, name, password_hash, refresh_token_hash, now, now);
        user.validate()?;
        Ok(user)
    }

    pub fn update_refresh_token_hash(
        &mut self,
        refresh_token_hash: Option<String>,
    ) -> anyhow::Result<()> {
        self.refresh_token_hash = refresh_token_hash;
        self.validate()?;
        Ok(())
    }
}

#[async_trait]
pub trait UserRepository {
    async fn find(&self, id: String) -> anyhow::Result<User>;
    async fn store(&self, user: User) -> anyhow::Result<()>;
    // async fn delete(&self, id: String) -> anyhow::Result<()>;
}
