-- EYEPEK Learning extended registration profiles and stable Tutor IDs
-- Run once in Enzonic SQL Editor before deploying the registration-form update.
CREATE TABLE IF NOT EXISTS learning_student_details (
 user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
 phone VARCHAR(25) NULL,
 city VARCHAR(100) NULL,
 grade_level VARCHAR(120) NULL,
 learning_goals TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_student_details_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_tutor_details (
 user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
 tutor_code VARCHAR(32) NOT NULL,
 phone VARCHAR(25) NULL,
 city VARCHAR(100) NULL,
 qualification VARCHAR(180) NULL,
 experience_years TINYINT UNSIGNED NOT NULL DEFAULT 0,
 subjects TEXT NULL,
 languages VARCHAR(500) NULL,
 teaching_mode ENUM('online','offline','both') NOT NULL DEFAULT 'online',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_tutor_code(tutor_code),
 CONSTRAINT fk_tutor_details_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_institution_details (
 user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
 contact_person VARCHAR(120) NULL,
 phone VARCHAR(25) NULL,
 city VARCHAR(100) NULL,
 website VARCHAR(255) NULL,
 institution_type VARCHAR(120) NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_institution_details_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Backfill stable codes for tutor accounts created before this migration.
INSERT IGNORE INTO learning_tutor_details (user_id,tutor_code)
SELECT id,CONCAT('EYtutor',LPAD(id,3,'0'))
FROM learning_users WHERE role='tutor';

-- Monthly tutor earning ledger. Entries are created/verified by Admin only.
CREATE TABLE IF NOT EXISTS learning_tutor_earning_ledger (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 tutor_id BIGINT UNSIGNED NOT NULL,
 earning_type ENUM('live_session','assignment') NOT NULL,
 source_id BIGINT UNSIGNED NOT NULL,
 period_month CHAR(7) NOT NULL,
 amount_paise BIGINT UNSIGNED NOT NULL,
 status ENUM('pending_review','approved','paid','rejected') NOT NULL DEFAULT 'pending_review',
 admin_note VARCHAR(1000) NULL,
 approved_by BIGINT UNSIGNED NULL,
 approved_at DATETIME NULL,
 paid_at DATETIME NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_tutor_earning_source(tutor_id,earning_type,source_id),
 KEY idx_tutor_earning_month(tutor_id,period_month,status),
 CONSTRAINT fk_tutor_earning_user FOREIGN KEY(tutor_id) REFERENCES learning_users(id) ON DELETE CASCADE,
 CONSTRAINT fk_tutor_earning_admin FOREIGN KEY(approved_by) REFERENCES learning_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Monthly payroll is calculated from verified session/assignment records and Admin rates.
