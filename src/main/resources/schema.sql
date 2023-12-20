-- Create 'student' table
CREATE TABLE student (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          first_name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255) NOT NULL,
                         phone_no VARCHAR(20),
                          is_waiver_signed BOOLEAN NOT NULL
);

-- Create 'session' table
CREATE TABLE session (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         session_type VARCHAR(255),
                         location VARCHAR(255),
                         time TIMESTAMP,
                         is_booked BOOLEAN NOT NULL,
                         is_paid_for BOOLEAN NOT NULL,
                         is_completed BOOLEAN NOT NULL,
                         student_id BIGINT,
                         FOREIGN KEY (student_id) REFERENCES student(id)
);
CREATE TABLE seven_day_session_template (
                                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                            template_name VARCHAR(255),
                                            coach VARCHAR(255)
);

CREATE TABLE session_template (
                                  id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                  session_type VARCHAR(255),
                                  location VARCHAR(255),
                                  day_of_week INT,
                                  time TIME,
                                  seven_day_template_id BIGINT,
                                  FOREIGN KEY (seven_day_template_id) REFERENCES seven_day_session_template(id)
);

