mod registrations;

use actix_web::web::ServiceConfig;

pub fn init(cfg: &mut ServiceConfig) {
    registrations::init(cfg);
}
