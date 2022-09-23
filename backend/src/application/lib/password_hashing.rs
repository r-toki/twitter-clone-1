use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

pub fn hash(password: &str) -> String {
    let salt = SaltString::generate(&mut OsRng);
    Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .unwrap()
        .to_string()
}

pub fn verify(password: &str, hashed_password: &str) -> anyhow::Result<()> {
    let hashed_password = PasswordHash::new(&hashed_password).map_err(|_| anyhow::anyhow!(""))?;
    Argon2::default()
        .verify_password(password.as_bytes(), &hashed_password)
        .map_err(|_| anyhow::anyhow!("could not verify"))
}
