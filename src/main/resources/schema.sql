CREATE TABLE club (
                     id BIGSERIAL PRIMARY KEY,
                     club_name VARCHAR(255),
                     club_type VARCHAR(255),
                     street_number VARCHAR(50),
                     street_name VARCHAR(255),
                     address_line2 VARCHAR(255),
                     city VARCHAR(100),
                     state VARCHAR(100),
                     postal_code VARCHAR(20),
                     country VARCHAR(100),
                     acc_created TIMESTAMPZ DEFAULT current_timestamp,
                     website_url VARCHAR(100),
                     is_club_private BOOLEAN
);
CREATE TABLE owner (
                       id BIGSERIAL PRIMARY KEY,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       phone_no VARCHAR(20),
                       email VARCHAR(255),
                       club_id BIGINT REFERENCES club(id)
);
CREATE TABLE student (
                          id BIGSERIAL PRIMARY KEY,
                          first_name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255) NOT NULL,
                         phone_no VARCHAR(20),
                            email VARCHAR(255),
                          is_waiver_signed BOOLEAN NOT NULL
);
CREATE TABLE coach (
                             id BIGSERIAL PRIMARY KEY,
                             first_name VARCHAR(255),
                             last_name VARCHAR(255),
                             phone_no VARCHAR(20),
                             email VARCHAR(255),
                             club_id BIGINT REFERENCES club(id)
);
CREATE TABLE session (
                         id BIGSERIAL PRIMARY KEY,
                         session_type VARCHAR(255),
                         location VARCHAR(255),
                         time TIMESTAMPTZ,
                         duration INTEGER,
                         is_booked BOOLEAN NOT NULL,
                         is_paid_for BOOLEAN NOT NULL,
                         is_completed BOOLEAN NOT NULL,
                         student_id BIGINT REFERENCES student(id),
                         club_id BIGINT REFERENCES club(id)
);
CREATE TABLE seven_day_session_template (
                                            id BIGSERIAL PRIMARY KEY,
                                            template_name VARCHAR(255),
                                            coach VARCHAR(255),
                                            club_id BIGINT REFERENCES club(id)
);
CREATE TABLE session_template (
                                  id BIGSERIAL PRIMARY KEY,
                                  session_type VARCHAR(255),
                                  location VARCHAR(255),
                                  day_of_week INT,
                                  time TIME,
                                  seven_day_template_id BIGINT REFERENCES seven_day_session_template(id)
);
