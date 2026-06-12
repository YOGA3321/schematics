# PLAN-db-optimization: Aligning Database Structure and Optimization with Case Study

This plan details the steps required to align the application's database schema, stored procedures, triggers, functions, and indexes with the specifications described in `Studi Kasus MBD.docx` and `FP (1).sql`.

---

## Overview

The case study outlines a database design for Schematics ITS 2027 Merchandise POS. It requires denormalized attributes (`total` in `detail_transaksi`, `total_harga` and `total_merchandise` in `transaksi`) managed via triggers, search optimization using B-Tree indexes, and a stored function `fn_pendapatan_event` to calculate total revenue per sub-event.

Comparing the existing Laravel migration files to the case study requirements and `FP (1).sql`, we identified two discrepancies:
1. **Missing Stored Function**: `fn_pendapatan_event` is missing from the Laravel triggers/functions migration (`2026_06_08_000000_create_pos_functions_and_triggers.php`).
2. **Missing Index**: An explicit foreign key index `idx_fk_pembeli` on `transaksi(id_pembeli)` is missing from the indexes migration (`2026_06_08_064824_add_indexes_to_pos_tables.php`).

This plan covers adding the missing components while preserving the lowercase naming conventions of the current Laravel implementation.

---

## Project Type
- **Type**: WEB (Laravel with PHP/Inertia React)
- **Primary Agent**: `database-architect` / `backend-specialist`

---

## Success Criteria
- [ ] Database migrations compile and execute without errors.
- [ ] Stored function `fn_pendapatan_event(id_event)` is registered in MySQL and returns correct sum of revenues.
- [ ] Index `idx_fk_pembeli` is explicitly registered on `transaksi(id_pembeli)`.
- [ ] The app's existing controllers and interface continue to function correctly.

---

## Tech Stack
- **Backend Framework**: Laravel 12.x
- **Database Engine**: MySQL / MariaDB (requires stored procedures, triggers, custom functions)
- **Language**: PHP 8.x

---

## File Structure

```
database/
├── migrations/
│   ├── 2026_06_08_000000_create_pos_functions_and_triggers.php  # Add fn_pendapatan_event
│   └── 2026_06_08_064824_add_indexes_to_pos_tables.php         # Add idx_fk_pembeli
└── seeders/
    └── DatabaseSeeder.php                                      # Seeding data
```

---

## Task Breakdown

### Phase 1: Database Logic Alignment
- **Task ID**: `DB-01`
- **Name**: Add Stored Function `fn_pendapatan_event`
- **Agent**: `database-architect`
- **Skills**: `database-design`
- **Priority**: P0
- **Dependencies**: None
- **Description**: Add the stored function `fn_pendapatan_event` to the existing triggers and functions migration.
  - **INPUT**: Case study function logic and `2026_06_08_000000_create_pos_functions_and_triggers.php`.
  - **OUTPUT**: Stored function code inside migration with appropriate raw queries and `down()` support.
  - **VERIFY**: Run `php artisan migrate:pretend` to see compilation output.

---

### Phase 2: Index Alignment
- **Task ID**: `DB-02`
- **Name**: Add Foreign Key Index `idx_fk_pembeli`
- **Agent**: `database-architect`
- **Skills**: `database-design`
- **Priority**: P1
- **Dependencies**: None
- **Description**: Add index `idx_fk_pembeli` on column `id_pembeli` inside table `transaksi` in `2026_06_08_064824_add_indexes_to_pos_tables.php`.
  - **INPUT**: `2026_06_08_064824_add_indexes_to_pos_tables.php`.
  - **OUTPUT**: Added `$table->index('id_pembeli', 'idx_fk_pembeli')` in `up()` and drop statement in `down()`.
  - **VERIFY**: Check migration compilation.

---

### Phase 3: Database Reconstruction & Verification
- **Task ID**: `DB-03`
- **Name**: Execute Migrations and Seed
- **Agent**: `database-architect`
- **Skills**: `database-design`
- **Priority**: P0
- **Dependencies**: `DB-01`, `DB-02`
- **Description**: Re-create the database using fresh migrations and run seeders to populate dummy data.
  - **INPUT**: Modified migration files and `DatabaseSeeder.php`.
  - **OUTPUT**: Fully rebuilt and populated database.
  - **VERIFY**: Run `php artisan migrate:fresh --seed` and verify status with `php artisan migrate:status`. Check database schemas to verify that `fn_pendapatan_event` and index `idx_fk_pembeli` exist.

---

## Phase X: Final Verification

- [x] Check migration status: `php artisan migrate:status` returns all `Ran`.
- [x] Run automated tests or schema checks.
- [x] Verify SQL index on `transaksi(id_pembeli)` exists.
- [x] Verify `fn_pendapatan_event` is callable and returns accurate revenue sums.
- [x] Socratic Gate was respected and aligned.

## ✅ PHASE X COMPLETE
- Database State: ✅ Cleanly Recreated
- Indexes: ✅ idx_fk_pembeli created
- Functions: ✅ fn_pendapatan_event verified
- Date: June 12, 2026
