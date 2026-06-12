# PLAN-pos-enhancement: POS Application Optimizations and Enhancements

This plan outlines the steps to improve the POS checkout pipeline, fix payment method mapping, prevent overselling on the client-side, and implement subevent sales analytics on the dashboard.

---

## Overview

We will align the Laravel backend controller with the database's built-in triggers, preventing the double-deduction of stock. Additionally, we will map payment methods correctly, add stock-limit validation to the cart in React, and show event-based sales figures on the admin dashboard.

---

## Project Type
- **Type**: WEB (Laravel with PHP/Inertia React)
- **Primary Agent**: `frontend-specialist` / `backend-specialist`

---

## Success Criteria
- [x] Cart prevents adding quantities exceeding available stock.
- [x] Depleted stock items are grayed out with a "HABIS" label.
- [x] Checkout database exceptions (insufficient stock) are caught and reported cleanly.
- [x] Stock is deducted exactly once in the database.
- [x] Selecting "Tunai" in the client correctly inserts payment method ID `3` (Tunai) in the database.
- [x] Event revenues are displayed on the Admin Dashboard.

---

## Tech Stack
- **Backend**: Laravel 12.x (Eloquent, DB Transaction)
- **Frontend**: React (Tailwind CSS, Inertia.js, Axios, SweetAlert2)

---

## Proposed File Structure Changes

```
app/
├── Http/Controllers/
│   ├── CheckoutController.php     # Custom exception catch
│   └── DashboardController.php    # Fetch subevent revenues
└── Actions/
    └── ProcessTransactionAction.php # Trigger alignment refactor

resources/js/Pages/
├── POS/
│   └── Index.jsx                  # Add stock check, mapping fix
└── Dashboard.jsx                  # Add subevent metrics section
```

---

## Task Breakdown

### Phase 1: Backend & Trigger Alignment
- **Task ID**: `ENH-01`
- **Name**: Refactor ProcessTransactionAction to utilize triggers
- **Agent**: `backend-specialist`
- **Skills**: `clean-code`, `database-design`
- **Priority**: P0
- **Dependencies**: None
- **Description**: Simplify PHP transaction code to rely on triggers for stock checks, price calculation, and stock reduction.
  - **INPUT**: `ProcessTransactionAction.php`
  - **OUTPUT**: Trigger-oriented action script.
  - **VERIFY**: Check that Eloquent runs insert without manual stock changes.

- **Task ID**: `ENH-02`
- **Name**: Graceful Stock Error Catch in CheckoutController
- **Agent**: `backend-specialist`
- **Skills**: `clean-code`
- **Priority**: P1
- **Dependencies**: `ENH-01`
- **Description**: Add QueryException handler to translate trigger signal text `stok tidak mencukupi` to client-friendly JSON error response.
  - **INPUT**: `CheckoutController.php`
  - **OUTPUT**: Clean error mapping.
  - **VERIFY**: Trigger out-of-stock and see clean error output.

---

### Phase 2: Frontend Validation & Mapping Fix
- **Task ID**: `ENH-03`
- **Name**: Fix Payment Method Mapping
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P0
- **Dependencies**: None
- **Description**: Match front-end payment selections to DB seeder (Tunai -> 3, QRIS -> 2, Transfer -> 1). Set default state to 3.
  - **INPUT**: `POS/Index.jsx`
  - **OUTPUT**: Re-mapped input values.
  - **VERIFY**: Check checkout network payload.

- **Task ID**: `ENH-04`
- **Name**: Add Front-end Stock Limits and Muting
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: None
- **Description**: Restrict item quantities in cart to available stock. Mute catalog items with 0 stock.
  - **INPUT**: `POS/Index.jsx`
  - **OUTPUT**: Enhanced React layout.
  - **VERIFY**: Verify item additions.

---

### Phase 3: Dashboard Metrics
- **Task ID**: `ENH-05`
- **Name**: Display Subevent Revenues on Dashboard
- **Agent**: `backend-specialist` & `frontend-specialist`
- **Skills**: `clean-code` & `frontend-design`
- **Priority**: P2
- **Dependencies**: None
- **Description**: Fetch metrics via `fn_pendapatan_event(id_event)` in DashboardController and display them as a list of event revenues on the dashboard.
  - **INPUT**: `DashboardController.php`, `Dashboard.jsx`
  - **OUTPUT**: Revenue by Event display card.
  - **VERIFY**: Open dashboard page and see data.

---

## Phase X: Final Verification
- [x] Verify checkout stock check fails gracefully.
- [x] Verify stock deductions are singular (exactly once).
- [x] Verify payment method mapping matches database.
- [x] Verify dashboard shows event metrics.

## ✅ PHASE X COMPLETE
- Visual Checks: ✅ Checked out-of-stock items grayed out with 'HABIS' badge
- Backend Logic: ✅ Leveraged triggers, solved double-deduction bug
- Seeder & Mapping: ✅ Aligned payment method IDs (Tunai => 3, QRIS => 2, Transfer => 1)
- Stored Function: ✅ fn_pendapatan_event integrated into Dashboard
- Build: ✅ Compiled successfully via Vite
- Date: June 12, 2026
