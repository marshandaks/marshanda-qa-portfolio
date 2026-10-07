/// <reference types="cypress" />
// Ref: AUT-006 | BAB V Tabel 5.32

describe("Penugasan Dosen", () => {
  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/courses/assignments", "**/api/admin/assignments*");
  });

  it("AUT-006 – Tambah lalu hapus penugasan dosen", () => {
    cy.intercept("POST", "**/api/admin/assignments").as("create");
    cy.intercept("DELETE", "**/api/admin/assignments/*").as("remove");

    cy.contains("button", "Tambah Penugasan").click();
    cy.get('[role="combobox"]').eq(0).click();
    cy.get('[role="option"]').first().click(); // mata kuliah
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').first().click(); // dosen
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);

    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
  });
});
