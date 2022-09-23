use super::lib::{
    jwt::{generate_tokens, Auth, Tokens},
    password_hashing::{hash, verify},
};
use crate::domain::user::{User, UserRepository};

use derive_new::new;
use std::sync::Arc;

#[derive(new, Debug)]
pub struct AuthService<R: UserRepository> {
    user_repository: Arc<R>,
}

impl<R: UserRepository> AuthService<R> {
    pub async fn sign_up(&self, name: String, password: String) -> anyhow::Result<Tokens> {
        let mut user = User::create(name, hash(&password))?;
        let tokens = generate_tokens(Auth::new(user.id.clone()));
        user.update_refresh_token_hash(Some(hash(&tokens.refresh_token)))?;
        self.user_repository.store(user).await?;
        Ok(tokens)
    }
}
