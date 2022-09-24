use crate::application::auth_service::AuthService;
use crate::infrastructure::user_repository_impl::UserRepositoryImpl;

use actix_web::web::Data;
use sqlx::PgPool;
use std::sync::Arc;

pub type ModulesExt = Data<Arc<Modules>>;

#[derive(Debug, Clone)]
pub struct Modules {
    pub auth_service: Arc<AuthService<UserRepositoryImpl>>,
}

impl Modules {
    pub fn new(pool: PgPool) -> Self {
        let pool = Arc::new(pool);
        let user_repository = Arc::new(UserRepositoryImpl::new(pool.clone()));
        let auth_service = Arc::new(AuthService::new(user_repository.clone()));
        Self { auth_service }
    }
}
