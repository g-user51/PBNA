-- Drinkoo Database Schema Creation
-- Created based on data-plan.md requirements

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS shelf_life_data;
DROP TABLE IF EXISTS sku_nutrition;
DROP TABLE IF EXISTS sku_master;
DROP TABLE IF EXISTS financial_transactions;
DROP TABLE IF EXISTS customer_master;
DROP TABLE IF EXISTS distributor_master;
DROP TABLE IF EXISTS state_wise_sales;

-- Create Distributor Master Table
CREATE TABLE distributor_master (
    distributor_id VARCHAR(10) PRIMARY KEY,
    distributor_name VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE
);

-- Create Customer Master Table
CREATE TABLE customer_master (
    customer_id VARCHAR(10) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    registration_date DATE NOT NULL,
    region VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_premium BOOLEAN DEFAULT FALSE,
    last_purchase_date DATE
);

-- Create SKU Master Table
CREATE TABLE sku_master (
    skuid VARCHAR(10) PRIMARY KEY,
    sku_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    size_ml INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    manufacturing_date DATE NOT NULL,
    shelf_life_days INTEGER NOT NULL,
    health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100)
);

-- Create SKU Nutrition Table
CREATE TABLE sku_nutrition (
    skuid VARCHAR(10) PRIMARY KEY,
    calories INTEGER NOT NULL,
    sugar_g DECIMAL(8,2) NOT NULL,
    fat_g DECIMAL(8,2) NOT NULL,
    protein_g DECIMAL(8,2) NOT NULL,
    carbs_g DECIMAL(8,2) NOT NULL,
    caffeine_mg INTEGER,
    sodium_mg INTEGER,
    fiber_g DECIMAL(8,2),
    vitamins_iu INTEGER,
    FOREIGN KEY (skuid) REFERENCES sku_master(skuid)
);

-- Create State-wise Sales Table
CREATE TABLE state_wise_sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state_name VARCHAR(100) NOT NULL,
    distributor_name VARCHAR(100) NOT NULL,
    units_distributed INTEGER NOT NULL,
    units_sold INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Financial Transactions Table
CREATE TABLE financial_transactions (
    transaction_id VARCHAR(10) PRIMARY KEY,
    customer_id VARCHAR(10) NOT NULL,
    transaction_amount DECIMAL(12,2) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    is_credited BOOLEAN NOT NULL,
    is_debit BOOLEAN NOT NULL,
    is_saved_to_ledger BOOLEAN DEFAULT FALSE,
    is_loan BOOLEAN DEFAULT FALSE,
    is_invoice_due BOOLEAN DEFAULT FALSE,
    invoice_date DATE NOT NULL,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer_master(customer_id)
);

-- Create Shelf-life Data Table
CREATE TABLE shelf_life_data (
    batch_id VARCHAR(10) PRIMARY KEY,
    skuid VARCHAR(10) NOT NULL,
    manufacturing_date DATE NOT NULL,
    shelf_life_expiry_date DATE NOT NULL,
    current_stock INTEGER NOT NULL,
    units_sold INTEGER NOT NULL,
    units_remaining INTEGER GENERATED ALWAYS AS (current_stock - units_sold) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (skuid) REFERENCES sku_master(skuid)
);

-- Create Indexes for better performance
CREATE INDEX idx_customer_email ON customer_master(email);
CREATE INDEX idx_customer_region ON customer_master(region);
CREATE INDEX idx_sku_category ON sku_master(category);
CREATE INDEX idx_sku_health_score ON sku_master(health_score);
CREATE INDEX idx_financial_customer_id ON financial_transactions(customer_id);
CREATE INDEX idx_financial_date ON financial_transactions(transaction_date);
CREATE INDEX idx_shelf_life_skuid ON shelf_life_data(skuid);
CREATE INDEX idx_shelf_life_expiry ON shelf_life_data(shelf_life_expiry_date);

COMMIT;