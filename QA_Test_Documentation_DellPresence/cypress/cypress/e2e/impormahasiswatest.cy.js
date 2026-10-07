/// <reference types="cypress" />
// Ref: AUT-014 | BAB V Tabel 5.37 | MTC-IMP-002

describe("Impor / Sinkronisasi Data Mahasiswa", () => {
  it("AUT-014 – Sinkronisasi data mahasiswa dari CIS", () => {
    cy.loginAs("admin");
    cy.openList("/dashboard/users/students", "**/api/admin/students*");
    cy.intercept("POST", "**/api/admin/students/sync*").as("sync");

    cy.contains("button", /Sinkronisasi/i).click();
    cy.wait("@sync", { timeout: 60000 }).its("response.statusCode").should("eq", 200);
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
