/// <reference types="cypress" />
// Ref: AUT-016 | BAB V Tabel 5.39

describe("Impor / Sinkronisasi Data Pegawai", () => {
  it("AUT-016 – Sinkronisasi data pegawai dari CIS", () => {
    cy.loginAs("admin");
    cy.openList("/dashboard/users/employees", "**/api/admin/employees*");
    cy.intercept("POST", "**/api/admin/employees/sync*").as("sync");

    cy.contains("button", /Sinkronisasi/i).click();
    cy.wait("@sync", { timeout: 60000 }).its("response.statusCode").should("eq", 200);
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
