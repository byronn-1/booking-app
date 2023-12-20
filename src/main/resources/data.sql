-- Insert sample data into 'student' table
INSERT INTO student (first_name, last_name, phone_no, is_waiver_signed) VALUES
                                                                                ( 'Alice', 'Smith', '123-456-7890', TRUE),
                                                                                 ( 'Bob', 'Johnson', '234-567-8901', FALSE),
                                                                                ( 'Charlie', 'Williams', '345-678-9012', TRUE);

-- Insert sample data into 'session' table
INSERT INTO session ( session_type, location, time, is_booked, is_paid_for, is_completed, student_id) VALUES
                                                                                                             ( 'Math Tutoring', 'Room 101', '2023-12-03 10:00:00', TRUE, TRUE, FALSE, 1),
                                                                                                             ( 'Science Workshop', 'Lab 202', '2023-12-04 13:00:00', TRUE, FALSE, FALSE, 1),
                                                                                                             ( 'Literature Review', 'Library', '2023-12-05 15:30:00', FALSE, FALSE, FALSE, 2),
                                                                                                             ( 'History Discussion', 'Room 103', '2023-12-06 11:00:00', TRUE, TRUE, TRUE, 3);

