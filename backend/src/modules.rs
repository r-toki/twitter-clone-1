use crate::application::auth_command::AuthCommand;
use crate::infrastructure::user_query_impl::UserQueryImpl;
use crate::infrastructure::user_repository_impl::UserRepositoryImpl;

use actix_web::web::Data;
use sqlx::PgPool;
use std::sync::Arc;

pub type ModulesExt = Data<Arc<Modules>>;

#[derive(Debug, Clone)]
pub struct Modules {
    pub auth_command: Arc<AuthCommand<UserRepositoryImpl>>,
    pub user_query: Arc<UserQueryImpl>,
}

impl Modules {
    pub fn new(pool: PgPool) -> Self {
        let pool = Arc::new(pool);

        // NOTE: for Command
        let user_repository = Arc::new(UserRepositoryImpl::new(pool.clone()));
        let auth_command = Arc::new(AuthCommand::new(user_repository.clone()));

        // NOTE: for Query
        let user_query = Arc::new(UserQueryImpl::new(pool.clone()));

        Self {
            auth_command,
            user_query,
        }
    }
}
