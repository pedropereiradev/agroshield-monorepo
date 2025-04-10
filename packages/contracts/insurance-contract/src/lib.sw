library;

use std::string::String;
use std::hash::sha256;
use std::{bytes::Bytes, bytes_conversions::u64::*};
pub fn generate_name(crop: String, season: String, policy_type: String) -> String {
    let mut name = Bytes::new();
    name.append(crop.as_bytes());
    name.append(String::from_ascii_str("-").as_bytes());
    name.append(season.as_bytes());
    name.append(String::from_ascii_str(" (").as_bytes());
    name.append(policy_type.as_bytes());
    name.append(String::from_ascii_str(") ").as_bytes());
    return String::from(name);
}
pub fn generate_sub_id(
    crop: String,
    season: String,
    start_date: String,
    duration_days: u64,
    region_x: u64,
    region_y: u64,
    policy_type: String,
) -> b256 {
    let mut sub_id = Bytes::new();
    sub_id.append(crop.as_bytes());
    sub_id.append(season.as_bytes());
    sub_id.append(start_date.as_bytes());
    sub_id.append(duration_days.to_le_bytes());
    sub_id.append(region_x.to_le_bytes());
    sub_id.append(region_y.to_le_bytes());
    sub_id.append(policy_type.as_bytes());
    return sha256(sub_id);
}
