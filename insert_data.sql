-- Drinkoo Database Data Insertion
-- Populates all tables with dummy data from data-plan.md

-- Insert Distributor Master Data
INSERT INTO distributor_master (distributor_id, distributor_name, region, contact_email, contact_phone, is_active) VALUES
('D001', 'Drinkoo South Zone', 'Southern Region', 'south@drinkoo.com', '+91-9876543210', TRUE),
('D002', 'Drinkoo North Zone', 'Northern Region', 'north@drinkoo.com', '+91-9876543211', TRUE),
('D003', 'Drinkoo East Zone', 'Eastern Region', 'east@drinkoo.com', '+91-9876543212', TRUE),
('D004', 'Drinkoo West Zone', 'Western Region', 'west@drinkoo.com', '+91-9876543213', TRUE),
('D005', 'Drinkoo Central Zone', 'Central Region', 'central@drinkoo.com', '+91-9876543214', TRUE);

-- Insert Customer Master Data (Sample - 3000 total customers)
INSERT INTO customer_master (customer_id, customer_name, email, account_number, registration_date, region, is_active, is_premium, last_purchase_date) VALUES
('C001', 'John Smith', 'john.smith@email.com', 'ACC123456789', '2025-12-01', 'North', TRUE, TRUE, '2026-01-15'),
('C002', 'Emily Johnson', 'emily.j@email.com', 'ACC987654321', '2025-12-02', 'South', TRUE, FALSE, '2026-01-20'),
('C003', 'Michael Brown', 'michael.b@email.com', 'ACC456789123', '2025-12-03', 'West', TRUE, TRUE, '2026-02-05'),
('C004', 'Sarah Davis', 'sarah.d@email.com', 'ACC789123456', '2025-12-04', 'East', TRUE, FALSE, '2026-02-10'),
('C005', 'David Wilson', 'david.w@email.com', 'ACC321654987', '2025-12-05', 'Central', TRUE, TRUE, '2026-02-15'),
('C006', 'Lisa Anderson', 'lisa.a@email.com', 'ACC654987321', '2025-12-06', 'South', TRUE, FALSE, '2026-03-01'),
('C007', 'James Taylor', 'james.t@email.com', 'ACC987321654', '2025-12-07', 'North', TRUE, TRUE, '2026-03-10'),
('C008', 'Mary Thomas', 'mary.t@email.com', 'ACC147258369', '2025-12-08', 'East', TRUE, FALSE, '2026-03-20'),
('C009', 'Robert Jackson', 'robert.j@email.com', 'ACC258369147', '2025-12-09', 'West', TRUE, TRUE, '2026-04-05'),
('C010', 'Jennifer White', 'jennifer.w@email.com', 'ACC369147258', '2025-12-10', 'Central', TRUE, FALSE, '2026-04-15');

-- Insert SKU Master Data (15 total SKUs)
INSERT INTO sku_master (skuid, sku_name, category, size_ml, base_price, manufacturing_date, shelf_life_days, health_score) VALUES
('SKU001', 'Classic Cola', 'Carbonated', 330, 45.00, '2026-01-01', 90, 85),
('SKU002', 'Diet Cola', 'Carbonated', 330, 47.00, '2026-01-01', 90, 88),
('SKU003', 'Lemon Lime', 'Carbonated', 500, 50.00, '2026-01-02', 90, 82),
('SKU004', 'Orange Soda', 'Carbonated', 500, 50.00, '2026-01-02', 90, 83),
('SKU005', 'Grape Soda', 'Carbonated', 330, 48.00, '2026-01-03', 90, 84),
('SKU006', 'Ice Tea Lemon', 'Ready-to-Drink', 500, 55.00, '2026-01-03', 180, 87),
('SKU007', 'Ice Tea Peach', 'Ready-to-Drink', 500, 55.00, '2026-01-03', 180, 86),
('SKU008', 'Energy Drink Original', 'Energy', 250, 60.00, '2026-01-04', 180, 89),
('SKU009', 'Energy Drink Citrus', 'Energy', 250, 60.00, '2026-01-04', 180, 90),
('SKU010', 'Water Natural', 'Water', 500, 30.00, '2026-01-04', 365, 92),
('SKU011', 'Water Flavored', 'Water', 500, 32.00, '2026-01-04', 365, 91),
('SKU012', 'Green Tea', 'Herbal', 500, 58.00, '2026-01-05', 180, 88),
('SKU013', 'Black Tea', 'Herbal', 500, 58.00, '2026-01-05', 180, 87),
('SKU014', 'Apple Juice', 'Juice', 330, 52.00, '2026-01-05', 180, 85),
('SKU015', 'Pomegranate Juice', 'Juice', 330, 54.00, '2026-01-05', 180, 86);

-- Insert SKU Nutrition Data
INSERT INTO sku_nutrition (skuid, calories, sugar_g, fat_g, protein_g, carbs_g, caffeine_mg, sodium_mg, fiber_g, vitamins_iu) VALUES
('SKU001', 140, 39.00, 0.00, 0.00, 39.00, 0, 5, 0.00, 0),
('SKU002', 5, 0.00, 0.00, 0.00, 1.00, 0, 5, 0.00, 0),
('SKU003', 120, 36.00, 0.00, 0.00, 36.00, 0, 5, 0.00, 0),
('SKU004', 130, 35.00, 0.00, 0.00, 35.00, 0, 5, 0.00, 0),
('SKU005', 125, 38.00, 0.00, 0.00, 38.00, 0, 5, 0.00, 0),
('SKU006', 80, 20.00, 0.00, 0.00, 20.00, 30, 10, 2.00, 100),
('SKU007', 85, 22.00, 0.00, 0.00, 22.00, 25, 10, 2.00, 100),
('SKU008', 110, 25.00, 0.00, 0.00, 25.00, 100, 15, 1.00, 150),
('SKU009', 115, 26.00, 0.00, 0.00, 26.00, 95, 15, 1.00, 150),
('SKU010', 0, 0.00, 0.00, 0.00, 0.00, 0, 10, 0.00, 50),
('SKU011', 5, 2.00, 0.00, 0.00, 2.00, 0, 10, 0.00, 50),
('SKU012', 60, 15.00, 0.00, 0.00, 15.00, 20, 8, 3.00, 120),
('SKU013', 70, 16.00, 0.00, 0.00, 16.00, 15, 8, 3.00, 120),
('SKU014', 90, 22.00, 0.00, 0.00, 22.00, 0, 12, 2.00, 130),
('SKU015', 95, 23.00, 0.00, 0.00, 23.00, 0, 12, 2.00, 130);

-- Insert State-wise Sales Data (36 rows: 28 states + 8 Union Territories)
INSERT INTO state_wise_sales (state_name, distributor_name, units_distributed, units_sold) VALUES
('Andhra Pradesh', 'Drinkoo South Zone', 15000, 14200),
('Arunachal Pradesh', 'Drinkoo North East', 8500, 8100),
('Assam', 'Drinkoo North East', 12000, 11500),
('Bihar', 'Drinkoo East Zone', 18000, 17200),
('Chhattisgarh', 'Drinkoo Central Zone', 10000, 9500),
('Goa', 'Drinkoo West Zone', 6000, 5800),
('Gujarat', 'Drinkoo West Zone', 22000, 21000),
('Haryana', 'Drinkoo North Zone', 16000, 15300),
('Himachal Pradesh', 'Drinkoo North Zone', 7000, 6700),
('Jharkhand', 'Drinkoo East Zone', 13000, 12400),
('Karnataka', 'Drinkoo South Zone', 20000, 19100),
('Kerala', 'Drinkoo South Zone', 11000, 10500),
('Madhya Pradesh', 'Drinkoo Central Zone', 17000, 16200),
('Maharashtra', 'Drinkoo West Zone', 25000, 23800),
('Manipur', 'Drinkoo North East', 5000, 4800),
('Meghalaya', 'Drinkoo North East', 4500, 4300),
('Mizoram', 'Drinkoo North East', 3000, 2900),
('Nagaland', 'Drinkoo North East', 4000, 3800),
('Odisha', 'Drinkoo East Zone', 14000, 13400),
('Punjab', 'Drinkoo North Zone', 9000, 8600),
('Rajasthan', 'Drinkoo Central Zone', 19000, 18200),
('Sikkim', 'Drinkoo North East', 2000, 1900),
('Tamil Nadu', 'Drinkoo South Zone', 21000, 20100),
('Telangana', 'Drinkoo South Zone', 18000, 17200),
('Tripura', 'Drinkoo North East', 3500, 3400),
('Uttar Pradesh', 'Drinkoo North Zone', 35000, 33500),
('Uttarakhand', 'Drinkoo North Zone', 8000, 7600),
('West Bengal', 'Drinkoo East Zone', 24000, 23000),
('Andaman and Nicobar Islands', 'Drinkoo South Zone', 1500, 1450),
('Chandigarh', 'Drinkoo North Zone', 2000, 1900),
('Dadra and Nagar Haveli and Daman and Diu', 'Drinkoo West Zone', 1200, 1150),
('Delhi', 'Drinkoo North Zone', 28000, 26800),
('Jammu and Kashmir', 'Drinkoo North Zone', 9000, 8600),
('Ladakh', 'Drinkoo North Zone', 1000, 950),
('Puducherry', 'Drinkoo South Zone', 2500, 2400),
('Lakshadweep', 'Drinkoo South Zone', 800, 750);

-- Insert Financial Transactions (Sample - ~15,000 total transactions)
INSERT INTO financial_transactions (transaction_id, customer_id, transaction_amount, transaction_type, is_credited, is_debit, is_saved_to_ledger, is_loan, is_invoice_due, invoice_date, transaction_date) VALUES
('T001', 'C001', 1500.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-01-15', '2026-01-15'),
('T002', 'C002', 2500.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-01-20', '2026-01-20'),
('T003', 'C003', 1200.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-02-05', '2026-02-05'),
('T004', 'C004', 3000.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-02-10', '2026-02-10'),
('T005', 'C005', 800.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-02-15', '2026-02-15'),
('T006', 'C006', 1800.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-03-01', '2026-03-01'),
('T007', 'C007', 2200.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-03-10', '2026-03-10'),
('T008', 'C008', 1500.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-03-20', '2026-03-20'),
('T009', 'C009', 2800.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-04-05', '2026-04-05'),
('T010', 'C010', 1200.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-04-15', '2026-04-15'),
('T011', 'C001', 2000.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-04-20', '2026-04-20'),
('T012', 'C002', 1800.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-05-01', '2026-05-01'),
('T013', 'C003', 2200.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-05-10', '2026-05-10'),
('T014', 'C004', 1500.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-05-15', '2026-05-15'),
('T015', 'C005', 3000.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-05-20', '2026-05-20'),
('T016', 'C006', 1200.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-05-25', '2026-05-25'),
('T017', 'C007', 2500.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-06-01', '2026-06-01'),
('T018', 'C008', 1800.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-06-05', '2026-06-05'),
('T019', 'C009', 2000.00, 'CREDIT', TRUE, FALSE, TRUE, FALSE, TRUE, '2026-06-10', '2026-06-10'),
('T020', 'C010', 2200.00, 'DEBIT', FALSE, TRUE, TRUE, FALSE, FALSE, '2026-06-15', '2026-06-15');

-- Insert Shelf-life Data (10 sample batches)
INSERT INTO shelf_life_data (batch_id, skuid, manufacturing_date, shelf_life_expiry_date, current_stock, units_sold) VALUES
('BATCH001', 'SKU001', '2026-01-01', '2026-03-31', 5000, 4200),
('BATCH002', 'SKU001', '2026-01-15', '2026-04-13', 3000, 2800),
('BATCH003', 'SKU002', '2026-01-01', '2026-03-31', 4500, 4100),
('BATCH004', 'SKU002', '2026-01-15', '2026-04-13', 2500, 2300),
('BATCH005', 'SKU003', '2026-01-02', '2026-04-02', 3500, 3200),
('BATCH006', 'SKU003', '2026-01-17', '2026-04-15', 2000, 1800),
('BATCH007', 'SKU004', '2026-01-02', '2026-04-02', 3000, 2900),
('BATCH008', 'SKU004', '2026-01-18', '2026-04-17', 1500, 1400),
('BATCH009', 'SKU005', '2026-01-03', '2026-04-01', 2800, 2600),
('BATCH010', 'SKU005', '2026-01-20', '2026-04-19', 1200, 1100);

COMMIT;