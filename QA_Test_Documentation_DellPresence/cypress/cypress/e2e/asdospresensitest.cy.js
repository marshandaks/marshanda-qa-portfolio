/// <reference types="cypress" />
// Ref: AUT-029 | BAB V Tabel 5.49 | MTC-AST-001

describe("Asisten Dosen – Kelola Presensi", () => {
  it("AUT-029 – Asisten dosen memulai sesi presensi", () => {
    cy.loginAs("assistant");
    cy.openList("/dashboard/assistant/attendance", "**/api/assistant/attendance/sessions/active*");
    cy.intercept("POST", "**/api/assistant/attendance/sessions").as("start");

    cy.contains("button", "Mulai Presensi").first().click();
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').contains("QR Code").click();
    cy.contains("button", "Mulai Sesi").click();

    cy.wait("@start").its("response.statusCode").should("eq", 200);
    cy.expectToast("Sesi presensi berhasil dimulai");
  });
});
