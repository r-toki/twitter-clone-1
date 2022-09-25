use crate::application::{
    jwt::Auth,
    user_query::{FindUserDto, UserQuery},
};

use async_trait::async_trait;
use derive_new::new;
use sqlx::{query_as, PgPool};
use std::sync::Arc;

#[derive(new, Debug)]
pub struct UserQueryImpl {
    pool: Arc<PgPool>,
}

#[async_trait]
impl UserQuery for UserQueryImpl {
    async fn find(&self, auth: Auth) -> anyhow::Result<FindUserDto> {
        query_as!(
            FindUserDto,
            r#"
select name from users
where id = $1
        "#,
            auth.user_id
        )
        .fetch_one(&*self.pool)
        .await
        .map_err(|e| e.into())
    }
}
