/// <reference types="cypress" />
// Ref: AUT-015 | BAB V Tabel 5.38 | MTC-IMP-001

describe("Impor / Sinkronisasi Data Dosen", () => {
  it("AUT-015 – Sinkronisasi data dosen dari CIS", () => {
    cy.loginAs("admin");
    cy.openList("/dashboard/users/lecturers", "**/api/admin/lecturers*");
    cy.intercept("POST", "**/api/admin/lecturers/sync*").as("sync");

    cy.contains("button", /Sinkronisasi/i).click();
    cy.wait("@sync", { timeout: 60000 }).its("response.statusCode").should("eq", 200);
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
