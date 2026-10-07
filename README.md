# QA Portfolio – Marshanda Simangunsong

QA Engineer focused on **test documentation, manual functional testing, UI automation (Cypress) and performance testing (JMeter)**.
This repository contains test documentation from three projects: test plans, test cases, execution records, bug reports and summaries.

📫 [[LinkedIn](https://linkedin.com/in/your-profile)](https://www.linkedin.com/in/marshandaks)  · ✉️ marshanda@gmail.com · 🐙 [GitHub https://github.com/marshandaks]
---

## 📊 At a Glance

| Metric | Total |
|---|---|
| Projects | 3 |
| Manual test cases | **165** (45 + 33 + 87) |
| Automated test cases (Cypress) | **29** across 19 spec files |
| Performance tests (JMeter) | **14** endpoints × 250 samples |
| Bugs reported | **29** (2 Critical, 6 High, 13 Medium, 8 Low) |

---

## 📁 Projects

| # | Project | Type | Testing Done | Folder |
|---|---------|------|--------------|--------|
| 1 | **DelPresence** – Integrated Digital Attendance System | Web (Admin, Lecturer, TA) + Mobile (Student) | Manual, Cypress automation, API & performance testing (JMeter) | [`QA_Test_Documentation_DellPresence`](./QA_Test_Documentation_DellPresence) |
| 2 | **Village Information System (Pangombusan)** | Website | Black-box functional, security (XSS), cross-browser | [`QA_Test_Documentation_SI_Desa_Pangombusan`](./QA_Test_Documentation_SI_Desa_Pangombusan) |
| 3 | **Quality Assurance System (SPM) – IT Del** | Laravel web app, 7 user roles | Functional, role-based access, security | [`QA_Test_Documentation_SPM_IT_DEL`](./QA_Test_Documentation_SPM_IT_DEL) |

---

## 🔍 Project Highlights

### 1. DelPresence – Digital Attendance System
A web and mobile attendance platform. The web app is used by Admin, Lecturers and Teaching Assistants; the mobile app is used by students (QR-based attendance and face registration).

- **Role:** QA Engineer
- **Period:** 5 – 14 May 2025
- **Tools:** Spreadsheet-based manual testing, Cypress, Apache JMeter
- **Requirements source:** Product Testing document, test items BU-01 to BU-29
- **Scope:** Authentication, Faculty / Study Program / Building / Room / Academic Year management, data import, course & schedule management, lecturer and TA assignment, attendance sessions, face registration

| Test type | Total | Result |
|---|---|---|
| Manual (26 Web, 7 Mobile; 24 positive, 9 negative) | 33 | 33 Pass |
| Automation – Cypress UI | 29 | 29 Pass |
| API & Performance – Apache JMeter | 14 endpoints | 0% error rate, but all endpoints exceeded the SLA (see below) |

**Bugs found: 9** (2 High, 5 Medium, 2 Low). 5 resolved (4 Closed, 1 Fixed), 4 still open or in progress.

Notable findings:
- 🔴 **BUG-007 (High, Open):** a QR code from an already-closed attendance session can still be used to check in.
- 🔴 **BUG-005 (High, Closed):** academic year end date could be set earlier than the start date.
- 🟠 **BUG-006:** double-clicking "Start Session" creates two active attendance sessions.
- 🟠 **BUG-003 / BUG-004:** floor count and room capacity accept negative values.

#### API & Performance Testing (Apache JMeter)

Besides functional testing, I ran load tests with Apache JMeter against the backend API (`:8080`) and the main web dashboard pages (`:3000`).

| Item | Detail |
|---|---|
| Tool | Apache JMeter |
| Endpoints tested | 14 (1 API endpoint: `POST /api/auth/login`; 13 dashboard pages: faculties, study programs, buildings, rooms, academic years, courses, assignments, schedules, lecturers, employees, students, student groups) |
| Load | 250 samples per endpoint |
| Metrics recorded | Average / min / max response time, standard deviation, error %, throughput (req/s), received & sent KB/s, average bytes |
| Pass criteria (SLA) | Average response time ≤ 3,000 ms **and** error rate ≤ 1% (target assumed by the tester as a general reference) |
| Result calculation | Delta vs SLA and Pass/Fail calculated automatically in the spreadsheet |

**Findings:**
- Error rate was **0%** on all 14 endpoints, so the API and pages stayed functionally stable under load.
- Average response time ranged from **6.8 s** (`POST /api/auth/login`) to **7.7 s** (`GET /dashboard/academic/faculties`), roughly 2–2.5× slower than the 3 s SLA. All 14 endpoints therefore fail the performance criterion.
- The result is reported as a **performance risk** (slow but stable) with a recommendation to profile the backend and the dashboard queries, rather than being counted as a pass.

> Note: API coverage in this project is limited to performance testing of the login endpoint plus the API calls exercised by the manual and Cypress UI tests. Dedicated functional API tests (for example in Postman) are not part of this documentation.

---

### 2. Village Information System (Pangombusan)
A village website with registration, login, news, announcements, gallery, suggestion box, and an ID-card cover letter (Surat Pengantar KTP) request and approval flow.

- **Role:** QA Engineer
- **Period:** 5 – 7 June 2023 (cycle 1), 9 June 2023 (retest)
- **Approach:** Black-box functional testing, manual
- **Environment:** Windows 11, Apache + MySQL, Chrome / Firefox / Edge
- **Coverage:** 12 test scenarios (registration, login, news, announcements, KTP request and approval, suggestions, gallery, logout, public pages, access control, browser compatibility)

| Metric | Result |
|---|---|
| Test cases | 45 (27 positive, 18 negative) |
| Priority split | 19 High, 23 Medium, 3 Low |
| Pass / Fail | 37 Pass, 8 Fail (82% pass rate on first cycle) |
| Bugs | 8 found, **all 8 fixed and closed after retest** |

Notable findings:
- 🔴 **BUG-007 (Critical):** stored XSS in the suggestion form executed a script on the admin's suggestions page.
- 🟠 **BUG-001 (High):** a raw database error ("Duplicate entry...") was shown to the user on duplicate registration.
- 🟠 **BUG-006 (High):** the NIK field accepted fewer than 16 digits.
- 🟡 **BUG-008:** admin pages were still viewable with the browser Back button after logout.

---

### 3. Quality Assurance System (SPM) – IT Del
A Laravel web application supporting the Internal Quality Audit (AMI) process at Institut Teknologi Del, with seven roles: Admin, Lead Auditor, Auditor, Study Program Head, Dean, PPKHA Head and SPM.

- **Context:** Final project, Group 01
- **Scope:** Authentication, Admin, Auditor, Auditee, Security, Validation modules

| Module | Test cases |
|---|---|
| Auditor | 27 |
| Admin | 25 |
| Auditee | 20 |
| Authentication | 10 |
| Security | 4 |
| Validation | 1 |
| **Total** | **87** |

**Bugs found: 12** (1 Critical, 4 High, 4 Medium, 3 Low).

Notable findings:
- 🔴 **BUG-003 (Critical):** a Study Program Head could open another program's self-evaluation form (FED) by manipulating the URL (broken access control).
- 🟠 **BUG-006 (High):** the follow-up action (ATL) was not created automatically after a finding was finalized.
- 🟠 **BUG-002 (High):** PDF export of the FED failed or timed out with large data (20+ indicators).
- 🟠 **BUG-010 (High):** a route typo (`route::get`) broke the auditee's ATL export to DOCX.

---

## 🧾 What's Inside Each Project Folder

| Document | Contents |
|---|---|
| Test Scenarios | Scenarios per module, priority, status calculated from test case results |
| Test Cases | Preconditions, steps, test data, expected vs actual result, status, linked Bug ID |
| Automation Scripts / Records | Cypress spec files, run count, duration, evidence (DelPresence) |
| Performance Test | JMeter results per endpoint with SLA comparison (DelPresence) |
| Bug Reports | Severity, priority, environment, steps to reproduce, evidence, retest result |
| Test Summary | Pass rate per module and defect summary by severity and status |

---

## 🛠️ Skills Demonstrated

- **Test design:** positive and negative scenarios, boundary and validation testing, role-based access testing
- **Testing types:** functional, regression / retest, security (XSS, URL manipulation), cross-browser, API & performance (load testing with JMeter, SLA analysis)
- **Tools:** Cypress, Apache JMeter, Excel / Google Sheets (formula-driven reports)
- **Defect management:** severity vs priority classification, bug lifecycle (Open → Fixed → Closed / Reopened), retest tracking
- **Traceability:** requirement → test case → bug linkage

---

## 📂 Repository Structure

```
├── QA_Test_Documentation_DellPresence/
├── QA_Test_Documentation_SI_Desa_Pangombusan/
├── QA_Test_Documentation_SPM_IT_DEL/
└── README.md
```

---

## 📬 Contact

Open to QA Engineer / QA Tester opportunities. Feel free to reach out via LinkedIn or email.
