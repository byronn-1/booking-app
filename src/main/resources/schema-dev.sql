CREATE TABLE club (
                      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                      club_name VARCHAR(255),
                      club_type VARCHAR(255),
                      street_number VARCHAR(50),
                      street_name VARCHAR(255),
                      address_line2 VARCHAR(255),
                      city VARCHAR(100),
                      state VARCHAR(100),
                      postal_code VARCHAR(20),
                      country VARCHAR(100),
                      acc_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                      website_url VARCHAR(100),
                      is_club_private BOOLEAN
);

CREATE TABLE owner (
                       id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       phone_no VARCHAR(20),
                       email VARCHAR(255),
                       club_id BIGINT,
                       FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE student (
                         id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         first_name VARCHAR(255) NOT NULL,
                         last_name VARCHAR(255) NOT NULL,
                         phone_no VARCHAR(20),
                         email VARCHAR(255),
                         is_waiver_signed BOOLEAN NOT NULL
);

CREATE TABLE coach (
                       id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       phone_no VARCHAR(20),
                       email VARCHAR(255),
                       club_id BIGINT,
                       FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE session (
                         id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         session_type VARCHAR(255),
                         location VARCHAR(255),
                         time TIMESTAMP WITH TIME ZONE,
                         duration INT,
                         is_booked BOOLEAN NOT NULL,
                         is_paid_for BOOLEAN NOT NULL,
                         is_completed BOOLEAN NOT NULL,
                         student_id BIGINT,
                         club_id BIGINT,
                         FOREIGN KEY (student_id) REFERENCES student(id),
                         FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE seven_day_session_template (
                                            id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                            template_name VARCHAR(255),
                                            coach VARCHAR(255),
                                            club_id BIGINT,
                                            FOREIGN KEY (club_id) REFERENCES club(id)
);

CREATE TABLE session_template (
                                  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                  session_type VARCHAR(255),
                                  location VARCHAR(255),
                                  day_of_week INT,
                                  time TIME,
                                  duration INT,
                                  seven_day_template_id BIGINT,
                                  FOREIGN KEY (seven_day_template_id) REFERENCES seven_day_session_template(id)
);