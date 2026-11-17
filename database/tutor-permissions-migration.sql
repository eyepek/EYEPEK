-- EYEPEK Learning tutor permissions (MySQL 8.4)
-- Run once in Enzonic SQL Editor after learning-schema.sql.
-- New tutors receive these defaults only after an administrator approves them.

CREATE TABLE IF NOT EXISTS learning_tutor_permissions (
  tutor_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  profile_management BOOLEAN NOT NULL DEFAULT TRUE,
  course_management BOOLEAN NOT NULL DEFAULT TRUE,
  course_publish BOOLEAN NOT NULL DEFAULT FALSE,
  student_management BOOLEAN NOT NULL DEFAULT TRUE,
  live_classes BOOLEAN NOT NULL DEFAULT TRUE,
  booking_management BOOLEAN NOT NULL DEFAULT TRUE,
  assignments BOOLEAN NOT NULL DEFAULT TRUE,
  attendance BOOLEAN NOT NULL DEFAULT TRUE,
  earnings BOOLEAN NOT NULL DEFAULT TRUE,
  payout_request BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tutor_permissions_user FOREIGN KEY (tutor_id) REFERENCES learning_users(id) ON DELETE CASCADE,
  CONSTRAINT fk_tutor_permissions_admin FOREIGN KEY (updated_by) REFERENCES learning_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
