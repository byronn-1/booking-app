-- Insert sample data into 'student' table
INSERT INTO student (id, first_name, last_name, phone_no, is_waiver_signed) VALUES
                                                                                (1, 'Alice', 'Smith', '123-456-7890', TRUE),
                                                                                (2, 'Bob', 'Johnson', '234-567-8901', FALSE),
                                                                                (3, 'Charlie', 'Williams', '345-678-9012', TRUE);

-- Insert sample data into 'session' table
INSERT INTO session (id, session_type, location, time, is_booked, is_paid_for, is_completed, student_id) VALUES
                                                                                                             (1, 'Math Tutoring', 'Room 101', '2023-12-03 10:00:00', TRUE, TRUE, FALSE, 1),
                                                                                                             (2, 'Science Workshop', 'Lab 202', '2023-12-04 13:00:00', TRUE, FALSE, FALSE, 1),
                                                                                                             (3, 'Literature Review', 'Library', '2023-12-05 15:30:00', FALSE, FALSE, FALSE, 2),
                                                                                                             (4, 'History Discussion', 'Room 103', '2023-12-06 11:00:00', TRUE, TRUE, TRUE, 3);

