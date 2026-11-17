-- EYEPEK Learning Enterprise Admin modules
-- Run this file ONCE in Enzonic SQL Editor after the existing learning schema.
-- No payment is captured, refunded or paid out by these tables; gateway actions need verified Razorpay integration.

CREATE TABLE IF NOT EXISTS learning_support_tickets (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 user_id BIGINT UNSIGNED NOT NULL,
 subject VARCHAR(180) NOT NULL,
 message TEXT NOT NULL,
 category VARCHAR(60) NOT NULL DEFAULT 'general',
 status ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
 admin_reply TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 KEY idx_support_status(status), KEY idx_support_user(user_id),
 CONSTRAINT fk_support_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_announcements (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 message TEXT NOT NULL,
 audience ENUM('all','student','tutor','institution') NOT NULL DEFAULT 'all',
 status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
 created_by BIGINT UNSIGNED NOT NULL,
 published_at DATETIME NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_announcement_status(status),
 CONSTRAINT fk_announcement_admin FOREIGN KEY(created_by) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_coupons (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 code VARCHAR(40) NOT NULL,
 discount_type ENUM('percent','fixed') NOT NULL DEFAULT 'percent',
 discount_value INT UNSIGNED NOT NULL,
 max_uses INT UNSIGNED NULL,
 used_count INT UNSIGNED NOT NULL DEFAULT 0,
 starts_at DATETIME NULL,
 expires_at DATETIME NULL,
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 created_by BIGINT UNSIGNED NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_learning_coupon_code(code),
 CONSTRAINT fk_coupon_admin FOREIGN KEY(created_by) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_reviews (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 student_id BIGINT UNSIGNED NOT NULL,
 tutor_id BIGINT UNSIGNED NOT NULL,
 booking_id BIGINT UNSIGNED NULL,
 rating TINYINT UNSIGNED NOT NULL,
 review_text TEXT NULL,
 status ENUM('pending','published','hidden') NOT NULL DEFAULT 'pending',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_review_status(status),
 CONSTRAINT fk_review_student FOREIGN KEY(student_id) REFERENCES learning_users(id),
 CONSTRAINT fk_review_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id),
 CONSTRAINT fk_review_booking FOREIGN KEY(booking_id) REFERENCES learning_bookings(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_attendance (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 session_id BIGINT UNSIGNED NOT NULL,
 user_id BIGINT UNSIGNED NOT NULL,
 joined_at DATETIME NULL,
 left_at DATETIME NULL,
 attendance_status ENUM('present','late','absent') NOT NULL DEFAULT 'present',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_session_attendance(session_id,user_id),
 CONSTRAINT fk_attendance_session FOREIGN KEY(session_id) REFERENCES learning_sessions(id) ON DELETE CASCADE,
 CONSTRAINT fk_attendance_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_certificates (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 certificate_code VARCHAR(80) NOT NULL,
 student_id BIGINT UNSIGNED NOT NULL,
 course_id BIGINT UNSIGNED NOT NULL,
 issued_by BIGINT UNSIGNED NOT NULL,
 issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 status ENUM('issued','revoked') NOT NULL DEFAULT 'issued',
 UNIQUE KEY uq_certificate_code(certificate_code),
 CONSTRAINT fk_certificate_student FOREIGN KEY(student_id) REFERENCES learning_users(id),
 CONSTRAINT fk_certificate_course FOREIGN KEY(course_id) REFERENCES learning_courses(id),
 CONSTRAINT fk_certificate_admin FOREIGN KEY(issued_by) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_tutor_payouts (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 tutor_id BIGINT UNSIGNED NOT NULL,
 amount_paise BIGINT UNSIGNED NOT NULL,
 currency CHAR(3) NOT NULL DEFAULT 'INR',
 status ENUM('requested','approved','processing','paid','rejected') NOT NULL DEFAULT 'requested',
 reference_note VARCHAR(180) NULL,
 reviewed_by BIGINT UNSIGNED NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 KEY idx_payout_status(status),
 CONSTRAINT fk_payout_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id),
 CONSTRAINT fk_payout_admin FOREIGN KEY(reviewed_by) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_admin_staff (
 user_id BIGINT UNSIGNED PRIMARY KEY,
 permission_json JSON NOT NULL,
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 created_by BIGINT UNSIGNED NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_admin_staff_user FOREIGN KEY(user_id) REFERENCES learning_users(id) ON DELETE CASCADE,
 CONSTRAINT fk_admin_staff_creator FOREIGN KEY(created_by) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_admin_audit_logs (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 admin_id BIGINT UNSIGNED NOT NULL,
 action VARCHAR(100) NOT NULL,
 resource VARCHAR(80) NOT NULL,
 resource_id BIGINT UNSIGNED NULL,
 details JSON NULL,
 ip_address VARCHAR(45) NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY idx_admin_audit_created(created_at),
 CONSTRAINT fk_audit_admin FOREIGN KEY(admin_id) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
