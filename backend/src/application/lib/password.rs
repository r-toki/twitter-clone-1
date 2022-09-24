use lazy_static::lazy_static;
use regex::Regex;
use validator::Validate;

lazy_static! {
    static ref PASSWORD_REGEX: Regex = Regex::new(r"[A-Za-z\d#$@!%&*?]{8,30}").unwrap();
}

#[derive(Debug, Validate)]
pub struct Password {
    #[validate(regex = "PASSWORD_REGEX")]
    value: String,
}

impl Password {
    pub fn new(value: String) -> anyhow::Result<Self> {
        let password = Self { value };
        password.validate().map_err(|_| {
            anyhow::anyhow!(
                "password: must be at least 8 digits in uppercase, lowercase, numbers or symbols"
            )
        })?;
        Ok(password)
    }

    pub fn to_string(&self) -> String {
        self.value.clone()
    }
}
