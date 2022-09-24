use crate::domain::user::{User, UserRepository};

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use derive_new::new;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, PgPool};
use std::sync::Arc;

#[derive(new, Debug, Clone)]
pub struct UserRepositoryImpl {
    pool: Arc<PgPool>,
}

#[async_trait]
impl UserRepository for UserRepositoryImpl {
    async fn find(&self, id: String) -> anyhow::Result<User> {
        query_as!(
            UserRow,
            r#"
select * from users
where id = $1
            "#,
            id
        )
        .fetch_one(&*self.pool)
        .await
        .map(|user_row| user_row.into())
        .map_err(|e| e.into())
    }

    async fn find_by_name(&self, name: String) -> anyhow::Result<User> {
        query_as!(
            UserRow,
            r#"
select * from users
where name = $1
            "#,
            name
        )
        .fetch_one(&*self.pool)
        .await
        .map(|user_row| user_row.into())
        .map_err(|e| e.into())
    }

    async fn store(&self, user: User) -> anyhow::Result<()> {
        let user_row: UserRow = user.into();
        query!(
            r#"
insert into users (id, name, password_hash, refresh_token_hash, created_at, updated_at)
values ($1, $2, $3, $4, $5, $6)
on conflict (id)
do update
set name = $2, password_hash = $3, refresh_token_hash = $4, created_at = $5, updated_at = $6
        "#,
            user_row.id,
            user_row.name,
            user_row.password_hash,
            user_row.refresh_token_hash,
            user_row.created_at,
            user_row.updated_at
        )
        .execute(&*self.pool)
        .await
        .map(|_| ())
        .map_err(|e| e.into())
    }
}

#[derive(new, Debug, Serialize, Deserialize)]
struct UserRow {
    pub id: String,
    pub name: String,
    pub password_hash: String,
    pub refresh_token_hash: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<UserRow> for User {
    fn from(user_row: UserRow) -> Self {
        User::new(
            user_row.id,
            user_row.name,
            user_row.password_hash,
            user_row.refresh_token_hash,
            user_row.created_at,
            user_row.updated_at,
        )
    }
}

impl From<User> for UserRow {
    fn from(user: User) -> Self {
        UserRow::new(
            user.id,
            user.name,
            user.password_hash,
            user.refresh_token_hash,
            user.created_at,
            user.updated_at,
        )
    }
}
