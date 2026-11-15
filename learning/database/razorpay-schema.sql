CREATE TABLE IF NOT EXISTS learning_bookings (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, student_id BIGINT UNSIGNED NOT NULL, tutor_id BIGINT UNSIGNED NOT NULL,
 amount_paise BIGINT UNSIGNED NOT NULL, currency CHAR(3) NOT NULL DEFAULT 'INR',
 status ENUM('pending_payment','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending_payment',
 paid_at DATETIME NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_booking_student(student_id), INDEX idx_booking_status(status)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS learning_payments (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, booking_id BIGINT UNSIGNED NOT NULL, student_id BIGINT UNSIGNED NOT NULL,
 razorpay_qr_id VARCHAR(64) NOT NULL, razorpay_payment_id VARCHAR(64) NULL, image_url TEXT NOT NULL,
 amount_paise BIGINT UNSIGNED NOT NULL, currency CHAR(3) NOT NULL DEFAULT 'INR',
 status ENUM('created','paid','amount_mismatch','failed','expired') NOT NULL DEFAULT 'created',
 expires_at DATETIME NOT NULL, paid_at DATETIME NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_razorpay_qr(razorpay_qr_id), UNIQUE KEY uq_razorpay_payment(razorpay_payment_id),
 INDEX idx_payment_booking(booking_id), CONSTRAINT fk_learning_payment_booking FOREIGN KEY(booking_id) REFERENCES learning_bookings(id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS learning_payment_events (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, event_id VARCHAR(100) NOT NULL, event_type VARCHAR(80) NOT NULL,
 processed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY uq_razorpay_event(event_id)
) ENGINE=InnoDB;