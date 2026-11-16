-- Run once in Enzonic SQL Editor on database eyepeklearning.
-- Creates persisted platform settings and promotes the existing owner account to Admin.
-- This does not change the account password.

CREATE TABLE IF NOT EXISTS learning_platform_settings (
  setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_by BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO learning_platform_settings (setting_key, setting_value) VALUES
('platform_name','EYEPEK Learning'),
('support_email','info.eyepek@gmail.com'),
('default_currency','INR'),
('platform_fee_percent','10'),
('maintenance_mode','false'),
('student_registration_enabled','true'),
('tutor_registration_enabled','true'),
('institution_registration_enabled','true')
ON DUPLICATE KEY UPDATE setting_key=VALUES(setting_key);

UPDATE learning_users
SET role='admin', status='active'
WHERE email='info.eyepek@gmail.com';

SELECT id, full_name, email, role, status
FROM learning_users
WHERE email='info.eyepek@gmail.com';
