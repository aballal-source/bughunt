# BugHunt Test Plan

**Document ID:** TP-001

**Version:** 1.0

**Date:** 2026-04-16

**Author:** Ahmed Ballal

**Project:** BugHunt - Crowdsourced Game Bug Reporting Platform

---
## 1. Overview
This test plan describes the testing strategy, scope, and approach for the BugHunt platform. BugHunt is a full stack web application that allows gamers to submit, upvote, and track bug reports for their favorite games. It includes a public bug reporting interface, an admin triage panel, and an analytics dashboard.

---
## 2. Objectives
- Verify all core user flows function correctly end to end
- Validate data integrity between the frontend, API, and database
- Ensure edge cases and negative scenarios are handled gracefully
- Confirm admin-only functionality is properly restricted
- Validate all API endpoints return correct status codes and responses
- Demonstrate automated regression coverage on critical user paths
---
## 3. Scope
### In Scope
- Bug report submission (happy path, edge cases, negative scenarios)
- Upvoting system including duplicate prevention
- Admin status triage (open, confirmed, patched)
- Analytics dashboard data accuracy
- API endpoint validation (GET, POST, PATCH)
- Database constraint enforcement (UNIQUE, NOT NULL, ENUM)
- Form validation on the frontend
### Out of Scope
- User authentication and registration (not yet implemented)
- Password security and hashing
- Performance and load testing
- Cross-browser compatibility (testing in Chrome only for v1)
- Mobile responsiveness
---
## 4. Test Strategy
### Testing Types
- **Manual testing** - 30 test cases covering functional, edge case, and negative scenarios executed and logged in a test matrix spreadsheet
- **Automated regression** - 10 critical test cases automated using Playwright and pytest covering end to end user flows

### Testing Approach
- Test each feature in isolation first, then test integration between layers
- Execute happy path tests before edge case and negative tests
- Log all defects found during testing in Linear with severity, steps to reproduce, expected vs actual behavior, and status
---
## 5. Test ENvironment
| Components       | Details                              |
|------------------|--------------------------------------|
| Operating System | Windows 11 x64                       |
| Browser          | Google Chrome (latest)               |
| Frontend         | React (Vite) - http://localhost:8000 |
| Database         | PostgreSQL 16 (Docker container)     |
| Test Framework   | pytest + Playwright                  |
| Defect Tracker   | Linear                               |
---
## 6. Test Data
- Seed data loaded via `/db/seed.sql` on container startup
- 5 games, 3 users, 10 bug reports, 5 upvotes pre-loaded
- Test cases that require specific data states will note setup steps in the preconditions column
---
## 7. Entry and Exit Criteria
### Entry Criteria
- Docker container is running and database is accessible
- Backend API is running and returning 200 on GET /bugs/
- Frontend is accessible at http://localhost:5173
- Seed data is loaded and verified
### Exit Criteria
- All 30 manual test cases have been executed and logged
- All critical severity defects have been resolved
- Automated regression suite passes with 0 failures
- Defect log exported and included in repository
---
## 8. Risk Areas
| Risk                                         | Likelihood | Impact   |
|----------------------------------------------|------------|----------|
| Duplicate upvote bypass                      | Medium     | High     | 
| SQL injection in form fields                 | Low        | Critical |
| Invalid ENUM value submitted via API         | Medium     | High     |
| Form submission with missing required fields | High       | Medium   |
| Admin status update failing silently         | Low        | High     |
| Analytics query returning incorrect counts   | Medium     | Medium   |
---
## 9. Defect Management
All defects discovered during testing are logged in Linear under the BugHunt project with the following fields:

- **Title** - brief description of the defect
- **Severity** - Critical / High / Medium / Low
- **Steps to Reproduce** - numbered steps to reliably reproduce
- **Expected Behavior** - what should happen
- **Actual Behavior** - what actually happens
- **Status** - Open / In Progress / Resolved
---
## 10. Test Cases
Manual test cases are documented in `/docs/test_cases.md`.
Automated test cases are located in `/tests/`.