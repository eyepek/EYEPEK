-- EYEPEK Learning core schema (MySQL 8.4)
-- Run this file once in Enzonic SQL Editor on database eyepeklearning.

CREATE TABLE IF NOT EXISTS learning_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','tutor','institution','admin') NOT NULL DEFAULT 'student',
  status ENUM('pending','active','suspended') NOT NULL DEFAULT 'active',
  email_verified_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_learning_users_email (email),
  KEY idx_learning_users_role_status (role,status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS learning_tutor_profiles (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  headline VARCHAR(180) NULL,
  bio TEXT NULL,
  hourly_rate_paise INT UNSIGNED NOT NULL DEFAULT 0,
  approval_status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tutor_user FOREIGN KEY (user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_institution_profiles (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  institution_name VARCHAR(180) NOT NULL,
  website VARCHAR(255) NULL,
  approval_status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_institution_user FOREIGN KEY (user_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_subjects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE KEY uq_learning_subject_slug(slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_tutor_subjects (
  tutor_id BIGINT UNSIGNED NOT NULL,
  subject_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(tutor_id,subject_id),
  CONSTRAINT fk_lts_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id) ON DELETE CASCADE,
  CONSTRAINT fk_lts_subject FOREIGN KEY(subject_id) REFERENCES learning_subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_courses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tutor_id BIGINT UNSIGNED NOT NULL,
  subject_id BIGINT UNSIGNED NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  price_paise INT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_course_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id),
  CONSTRAINT fk_course_subject FOREIGN KEY(subject_id) REFERENCES learning_subjects(id) ON DELETE SET NULL,
  KEY idx_course_status(status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_bookings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT UNSIGNED NOT NULL,
  tutor_id BIGINT UNSIGNED NOT NULL,
  course_id BIGINT UNSIGNED NULL,
  scheduled_start DATETIME NULL,
  scheduled_end DATETIME NULL,
  amount_paise BIGINT UNSIGNED NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('pending_payment','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending_payment',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_booking_student(student_id),
  KEY idx_booking_tutor(tutor_id),
  CONSTRAINT fk_booking_student FOREIGN KEY(student_id) REFERENCES learning_users(id),
  CONSTRAINT fk_booking_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id),
  CONSTRAINT fk_booking_course FOREIGN KEY(course_id) REFERENCES learning_courses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT UNSIGNED NOT NULL,
  classroom_url VARCHAR(500) NULL,
  started_at DATETIME NULL,
  ended_at DATETIME NULL,
  status ENUM('scheduled','live','finished','cancelled') NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_session_booking FOREIGN KEY(booking_id) REFERENCES learning_bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_assignments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tutor_id BIGINT UNSIGNED NOT NULL,
  course_id BIGINT UNSIGNED NULL,
  title VARCHAR(180) NOT NULL,
  instructions TEXT NULL,
  due_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignment_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id),
  CONSTRAINT fk_assignment_course FOREIGN KEY(course_id) REFERENCES learning_courses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_submissions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  assignment_id BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  submission_text TEXT NULL,
  file_url VARCHAR(500) NULL,
  feedback TEXT NULL,
  score DECIMAL(5,2) NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_assignment_student(assignment_id,student_id),
  CONSTRAINT fk_submission_assignment FOREIGN KEY(assignment_id) REFERENCES learning_assignments(id) ON DELETE CASCADE,
  CONSTRAINT fk_submission_student FOREIGN KEY(student_id) REFERENCES learning_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS learning_payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(30) NOT NULL DEFAULT 'razorpay',
  provider_order_id VARCHAR(100) NULL,
  provider_payment_id VARCHAR(100) NULL,
  amount_paise BIGINT UNSIGNED NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('created','paid','failed','refunded') NOT NULL DEFAULT 'created',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_provider_payment(provider_payment_id),
  CONSTRAINT fk_payment_booking FOREIGN KEY(booking_id) REFERENCES learning_bookings(id),
  CONSTRAINT fk_payment_student FOREIGN KEY(student_id) REFERENCES learning_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO learning_subjects(name,slug) VALUES
('Mathematics','mathematics'),('English','english'),('Physics','physics'),
('Chemistry','chemistry'),('Computer Science','computer-science'),
('Python Programming','python-programming'),('Java Programming','java-programming');
