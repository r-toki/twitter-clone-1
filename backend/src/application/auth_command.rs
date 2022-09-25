use super::lib::{
    jwt::{generate_tokens, Auth, Tokens},
    password::Password,
    password_hashing::{hash, verify},
};
use crate::domain::user::{User, UserRepository};

use derive_new::new;
use std::sync::Arc;

#[derive(new, Debug)]
pub struct AuthCommand<R: UserRepository> {
    user_repository: Arc<R>,
}

impl<R: UserRepository> AuthCommand<R> {
    pub async fn sign_up(&self, name: String, password: String) -> anyhow::Result<Tokens> {
        let password = Password::new(password)?;
        let mut user = User::create(name, hash(&password.to_string()))?;
        let tokens = generate_tokens(Auth::new(user.id.clone()));

        user.update_refresh_token_hash(Some(hash(&tokens.refresh_token)))?;

        self.user_repository.store(user).await?;

        Ok(tokens)
    }

    pub async fn sign_in(&self, name: String, password: String) -> anyhow::Result<Tokens> {
        let mut user = self.user_repository.find_by_name(name).await?;

        verify(&password, &user.password_hash).map_err(|_| anyhow::anyhow!("unauthorized"))?;

        let tokens = generate_tokens(Auth::new(user.id.clone()));

        user.update_refresh_token_hash(Some(hash(&tokens.refresh_token)))?;

        self.user_repository.store(user).await?;

        Ok(tokens)
    }

    pub async fn sign_out(&self, auth: Auth) -> anyhow::Result<()> {
        let mut user = self.user_repository.find(auth.user_id).await?;

        user.update_refresh_token_hash(None)?;

        self.user_repository.store(user).await
    }

    pub async fn refresh(&self, auth: Auth, refresh_token: String) -> anyhow::Result<Tokens> {
        let mut user = self.user_repository.find(auth.user_id).await?;

        let refresh_token_hash = user
            .refresh_token_hash
            .clone()
            .ok_or(anyhow::anyhow!("unauthorized"))?;

        verify(&refresh_token, &refresh_token_hash).map_err(|_| anyhow::anyhow!("unauthorized"))?;

        let tokens = generate_tokens(Auth::new(user.id.clone()));

        user.update_refresh_token_hash(Some(hash(&tokens.refresh_token)))?;

        self.user_repository.store(user).await?;

        Ok(tokens)
    }
}
