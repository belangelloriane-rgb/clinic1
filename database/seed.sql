INSERT INTO patients (full_name, age, gender, phone, address, diagnosis, status, visit_date) VALUES
('Maria Santos', 34, 'Female', '09175550101', 'Jaro, Iloilo City', 'Hypertension', 'Follow-up', CURDATE()),
('Juan Dela Cruz', 52, 'Male', '09185550102', 'Mandurriao, Iloilo City', 'Type 2 Diabetes', 'Active', CURDATE()),
('Ana Reyes', 27, 'Female', '09195550103', 'La Paz, Iloilo City', 'Migraine', 'Active', DATE_SUB(CURDATE(), INTERVAL 2 DAY)),
('Carlo Mendoza', 8, 'Male', '09205550104', 'Molo, Iloilo City', 'Asthma', 'Follow-up', DATE_SUB(CURDATE(), INTERVAL 4 DAY)),
('Liza Fernandez', 61, 'Female', '09215550105', 'Arevalo, Iloilo City', 'Osteoarthritis', 'Active', DATE_SUB(CURDATE(), INTERVAL 7 DAY)),
('Miguel Torres', 45, 'Male', '09225550106', 'Oton, Iloilo', 'Acute bronchitis', 'Discharged', DATE_SUB(CURDATE(), INTERVAL 10 DAY)),
('Grace Villanueva', 39, 'Female', '09235550107', 'Pavia, Iloilo', 'Gastritis', 'Discharged', DATE_SUB(CURDATE(), INTERVAL 14 DAY)),
('Paolo Garcia', 19, 'Male', '09245550108', 'Santa Barbara, Iloilo', 'Sprained ankle', 'Follow-up', DATE_SUB(CURDATE(), INTERVAL 3 DAY));
