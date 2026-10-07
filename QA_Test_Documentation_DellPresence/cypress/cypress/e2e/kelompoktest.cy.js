/// <reference types="cypress" />
// Ref: AUT-013 | BAB V Tabel 5.36

describe("Kelompok Mahasiswa", () => {
  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/users/student-groups", "**/api/admin/student-groups*");
  });

  it("AUT-013 – Tambah kelompok lalu kelola anggota", () => {
    cy.intercept("POST", "**/api/admin/student-groups").as("create");
    cy.contains("button", "Tambah Kelompok").click();
    cy.fillForm({ name: `Kelompok Uji ${Date.now().toString().slice(-4)}` });
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').first().click();
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);

    cy.rowAction("Kelola Anggota");
    cy.get('[role="dialog"]').should("be.visible");
  });
});
