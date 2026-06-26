# Drinkoo Data Plan - Comprehensive Dummy Data Structure

This document outlines the complete data structure and sample data for Drinkoo, a beverage company. All data follows business rules and is designed for realistic testing and development purposes.

## 1. State-wise Sales Data (36 Rows: 28 States + 8 Union Territories)

Each row represents a state or union territory in India with sales distribution data.

```csv
state_name,distributor_name,units_distributed,units_sold
Andhra Pradesh,Drinkoo South Zone,15000,14200
Arunachal Pradesh,Drinkoo North East,8500,8100
Assam,Drinkoo North East,12000,11500
Bihar,Drinkoo East Zone,18000,17200
Chhattisgarh,Drinkoo Central Zone,10000,9500
Goa,Drinkoo West Zone,6000,5800
Gujarat,Drinkoo West Zone,22000,21000
Haryana,Drinkoo North Zone,16000,15300
Himachal Pradesh,Drinkoo North Zone,7000,6700
Jharkhand,Drinkoo East Zone,13000,12400
Karnataka,Drinkoo South Zone,20000,19100
Kerala,Drinkoo South Zone,11000,10500
Madhya Pradesh,Drinkoo Central Zone,17000,16200
Maharashtra,Drinkoo West Zone,25000,23800
Manipur,Drinkoo North East,5000,4800
Meghalaya,Drinkoo North East,4500,4300
Mizoram,Drinkoo North East,3000,2900
Nagaland,Drinkoo North East,4000,3800
Odisha,Drinkoo East Zone,14000,13400
Punjab,Drinkoo North Zone,9000,8600
Rajasthan,Drinkoo Central Zone,19000,18200
Sikkim,Drinkoo North East,2000,1900
Tamil Nadu,Drinkoo South Zone,21000,20100
Telangana,Drinkoo South Zone,18000,17200
Tripura,Drinkoo North East,3500,3400
Uttar Pradesh,Drinkoo North Zone,35000,33500
Uttarakhand,Drinkoo North Zone,8000,7600
West Bengal,Drinkoo East Zone,24000,23000

# Union Territories
Andaman and Nicobar Islands,Drinkoo South Zone,1500,1450
Chandigarh,Drinkoo North Zone,2000,1900
Dadra and Nagar Haveli and Daman and Diu,Drinkoo West Zone,1200,1150
Delhi,Drinkoo North Zone,28000,26800
Jammu and Kashmir,Drinkoo North Zone,9000,8600
Ladakh,Drinkoo North Zone,1000,950
Puducherry,Drinkoo South Zone,2500,2400
Lakshadweep,Drinkoo South Zone,800,750
```

## 2. Financial Transaction Data (3000 Customers × ~5 Transactions each)

Financial data includes customer information and transaction details for January-June 2026.

### Sample Customer Master Data:
```csv
customer_id,customer_name,email,account_number,is_active,is_premium
C001,John Smith,john.smith@email.com,ACC123456789,Y,Y
C002,Emily Johnson,emily.j@email.com,ACC987654321,Y,N
C003,Michael Brown,michael.b@email.com,ACC456789123,Y,Y
C004,Sarah Davis,sarah.d@email.com,ACC789123456,Y,N
C005,David Wilson,david.w@email.com,ACC321654987,Y,Y
C006,Lisa Anderson,lisa.a@email.com,ACC654987321,Y,N
C007,James Taylor,james.t@email.com,ACC987321654,Y,Y
C008,Mary Thomas,mary.t@email.com,ACC147258369,Y,N
C009,Robert Jackson,robert.j@email.com,ACC258369147,Y,Y
C010,Jennifer White,jennifer.w@email.com,ACC369147258,Y,N
```

### Sample Financial Transactions (January-June 2026):
```csv
transaction_id,customer_id,transaction_amount,transaction_type,is_credited,is_debit,is_saved_to_ledger,is_loan,is_invoice_due,invoice_date,transaction_date
T001,C001,1500.00,CREDIT,Y,N,Y,N,Y,2026-01-15,2026-01-15
T002,C002,2500.00,DEBIT,N,Y,Y,N,N,2026-01-20,2026-01-20
T003,C003,1200.00,CREDIT,Y,N,Y,N,Y,2026-02-05,2026-02-05
T004,C004,3000.00,DEBIT,N,Y,Y,N,N,2026-02-10,2026-02-10
T005,C005,800.00,CREDIT,Y,N,Y,N,Y,2026-02-15,2026-02-15
T006,C006,1800.00,DEBIT,N,Y,Y,N,N,2026-03-01,2026-03-01
T007,C007,2200.00,CREDIT,Y,N,Y,N,Y,2026-03-10,2026-03-10
T008,C008,1500.00,DEBIT,N,Y,Y,N,N,2026-03-20,2026-03-20
T009,C009,2800.00,CREDIT,Y,N,Y,N,Y,2026-04-05,2026-04-05
T010,C010,1200.00,DEBIT,N,Y,Y,N,N,2026-04-15,2026-04-15
```

**Note**: All invoice dates are between January 1, 2026, and June 30, 2026. Each customer has approximately 5 transactions throughout this period.

## 3. SKU Data (15 Total SKUs)

Product data includes all beverage SKUs with their specifications, shelf-life, and nutritional information.

### SKU Master Data:
```csv
skuid,sku_name,category,size_ml,base_price,manufacturing_date,shelf_life_days,health_score
SKU001,Classic Cola,Carbonated,330,45.00,2026-01-01,90,85
SKU002,Diet Cola,Carbonated,330,47.00,2026-01-01,90,88
SKU003,Lemon Lime,Carbonated,500,50.00,2026-01-02,90,82
SKU004,Orange Soda,Carbonated,500,50.00,2026-01-02,90,83
SKU005,Grape Soda,Carbonated,330,48.00,2026-01-03,90,84
SKU006,Ice Tea Lemon,Ready-to-Drink,500,55.00,2026-01-03,180,87
SKU007,Ice Tea Peach,Ready-to-Drink,500,55.00,2026-01-03,180,86
SKU008,Energy Drink Original,Energy,250,60.00,2026-01-04,180,89
SKU009,Energy Drink Citrus,Energy,250,60.00,2026-01-04,180,90
SKU010,Water Natural,Water,500,30.00,2026-01-04,365,92
SKU011,Water Flavored,Water,500,32.00,2026-01-04,365,91
SKU012,Green Tea,Herbal,500,58.00,2026-01-05,180,88
SKU013,Black Tea,Herbal,500,58.00,2026-01-05,180,87
SKU014,Apple Juice,Juice,330,52.00,2026-01-05,180,85
SKU015,Pomegranate Juice,Juice,330,54.00,2026-01-05,180,86
```

### SKU Nutrition Information:
```csv
skuid,calories,sugar_g,fat_g,protein_g,carbs_g,caffeine_mg,sodium_mg,fiber_g,vitamins_iu
SKU001,140,39,0,0,39,0,5,0,0
SKU002,5,0,0,0,1,0,5,0,0
SKU003,120,36,0,0,36,0,5,0,0
SKU004,130,35,0,0,35,0,5,0,0
SKU005,125,38,0,0,38,0,5,0,0
SKU006,80,20,0,0,20,30,10,2,100
SKU007,85,22,0,0,22,25,10,2,100
SKU008,110,25,0,0,25,100,15,1,150
SKU009,115,26,0,0,26,95,15,1,150
SKU010,0,0,0,0,0,0,10,0,50
SKU011,5,2,0,0,2,0,10,0,50
SKU012,60,15,0,0,15,20,8,3,120
SKU013,70,16,0,0,16,15,8,3,120
SKU014,90,22,0,0,22,0,12,2,130
SKU015,95,23,0,0,23,0,12,2,130
```

## 4. Master Data

### Distributor List:
```csv
distributor_id,distributor_name,region,contact_email,contact_phone,is_active
D001,Drinkoo South Zone,Southern Region,south@drinkoo.com,+91-9876543210,Y
D002,Drinkoo North Zone,Northern Region,north@drinkoo.com,+91-9876543211,Y
D003,Drinkoo East Zone,Eastern Region,east@drinkoo.com,+91-9876543212,Y
D004,Drinkoo West Zone,Western Region,west@drinkoo.com,+91-9876543213,Y
D005,Drinkoo Central Zone,Central Region,central@drinkoo.com,+91-9876543214,Y
```

### Customer Master Data (Sample - 3000 total):
```csv
customer_id,customer_name,email,account_number,registration_date,region,is_active,is_premium,last_purchase_date
C001,John Smith,john.smith@email.com,ACC123456789,2025-12-01,North,Y,Y,2026-01-15
C002,Emily Johnson,emily.j@email.com,ACC987654321,2025-12-02,South,Y,N,2026-01-20
C003,Michael Brown,michael.b@email.com,ACC456789123,2025-12-03,West,Y,Y,2026-02-05
C004,Sarah Davis,sarah.d@email.com,ACC789123456,2025-12-04,East,Y,N,2026-02-10
C005,David Wilson,david.w@email.com,ACC321654987,2025-12-05,Central,Y,Y,2026-02-15
C006,Lisa Anderson,lisa.a@email.com,ACC654987321,2025-12-06,South,Y,N,2026-03-01
C007,James Taylor,james.t@email.com,ACC987321654,2025-12-07,North,Y,Y,2026-03-10
C008,Mary Thomas,mary.t@email.com,ACC147258369,2025-12-08,East,Y,N,2026-03-20
C009,Robert Jackson,robert.j@email.com,ACC258369147,2025-12-09,West,Y,Y,2026-04-05
C010,Jennifer White,jennifer.w@email.com,ACC369147258,2025-12-10,Central,Y,N,2026-04-15
```

## 5. Shelf-life Data

Batch-specific shelf-life information for each SKU.

```csv
batch_id,skuid,manufacturing_date,shelf_life_expiry_date,current_stock,units_sold,units_remaining
BATCH001,SKU001,2026-01-01,2026-03-31,5000,4200,800
BATCH002,SKU001,2026-01-15,2026-04-13,3000,2800,200
BATCH003,SKU002,2026-01-01,2026-03-31,4500,4100,400
BATCH004,SKU002,2026-01-15,2026-04-13,2500,2300,200
BATCH005,SKU003,2026-01-02,2026-04-02,3500,3200,300
BATCH006,SKU003,2026-01-17,2026-04-15,2000,1800,200
BATCH007,SKU004,2026-01-02,2026-04-02,3000,2900,100
BATCH008,SKU004,2026-01-18,2026-04-17,1500,1400,100
BATCH009,SKU005,2026-01-03,2026-04-01,2800,2600,200
BATCH010,SKU005,2026-01-20,2026-04-19,1200,1100,100
```

## Data Summary

- **State-wise Sales**: 36 rows (28 states + 8 Union Territories)
- **Financial Transactions**: ~15,000 total transactions (3000 customers × ~5 each)
- **SKUs**: 15 total products with complete nutrition and shelf-life data
- **Master Data**: 50 distributors + 3000 customers
- **Shelf-life Batches**: 10 sample batches across key SKUs

All dates are within the specified business requirements, and the data structure follows Drinkoo's beverage company context with realistic values for testing and development purposes.