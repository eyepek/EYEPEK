-- EYEPEK Learning: Admin-controlled tutor allocation
-- Run once in Enzonic SQL Editor before deploying this feature.
CREATE TABLE IF NOT EXISTS learning_student_tutor_assignments (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 student_id BIGINT UNSIGNED NOT NULL,
 tutor_id BIGINT UNSIGNED NOT NULL,
 assigned_by BIGINT UNSIGNED NOT NULL,
 status ENUM('active','ended') NOT NULL DEFAULT 'active',
 admin_note VARCHAR(1000) NULL,
 assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 ended_at DATETIME NULL,
 KEY idx_student_tutor_student(student_id,status),
 KEY idx_student_tutor_tutor(tutor_id,status),
 CONSTRAINT fk_student_tutor_student FOREIGN KEY(student_id) REFERENCES learning_users(id) ON DELETE CASCADE,
 CONSTRAINT fk_student_tutor_tutor FOREIGN KEY(tutor_id) REFERENCES learning_users(id) ON DELETE CASCADE,
 CONSTRAINT fk_student_tutor_admin FOREIGN KEY(assigned_by) REFERENCES learning_users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
