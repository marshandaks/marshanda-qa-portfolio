/// <reference types="cypress" />
// Ref: AUT-025, AUT-026 | BAB V Tabel 5.46 | MTC-LEC-002 (+ regresi BUG-007)

describe("Dosen – Kelola Presensi", () => {
  beforeEach(() => {
    cy.loginAs("lecturer");
    cy.intercept("GET", "**/api/lecturer/attendance/sessions/active*").as("activeSessions");
    cy.intercept("POST", "**/api/lecturer/attendance/sessions").as("startSession");
    cy.visit("/dashboard/lecturer/attendance");
    cy.wait("@activeSessions");
  });

  const startSession = (method) => {
    cy.contains("button", "Mulai Presensi").first().click();
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').contains(method).click();
    cy.contains("button", "Mulai Sesi").click();
  };

  it("AUT-025 – Memulai sesi presensi dengan QR Code", () => {
    startSession("QR Code");
    cy.wait("@startSession").its("response.statusCode").should("eq", 200);
    cy.contains("Sesi presensi berhasil dimulai").should("be.visible");
  });

  it("AUT-026 – Memulai sesi presensi dengan Pengenalan Wajah", () => {
    startSession("Pengenalan Wajah");
    cy.wait("@startSession").its("response.statusCode").should("eq", 200);
    cy.contains("Face Recognition").should("be.visible");
  });

  it("Regresi BUG-007 – Klik ganda 'Mulai Sesi' hanya membuat satu sesi", () => {
    let calls = 0;
    cy.intercept("POST", "**/api/lecturer/attendance/sessions", (req) => { calls += 1; req.continue(); }).as("startOnce");
    cy.contains("button", "Mulai Presensi").first().click();
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').contains("QR Code").click();
    cy.contains("button", "Mulai Sesi").dblclick();
    cy.wait("@startOnce").then(() => expect(calls).to.eq(1));
  });
});
