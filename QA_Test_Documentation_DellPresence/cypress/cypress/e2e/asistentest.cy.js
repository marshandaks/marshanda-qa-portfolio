/// <reference types="cypress" />
// Ref: AUT-027 | BAB V Tabel 5.47 | MTC-LEC-004

describe("Dosen – Kelola Asisten Dosen", () => {
  it("AUT-027 – Dosen menambahkan asisten dosen", () => {
    cy.loginAs("lecturer");
    cy.openList("/dashboard/lecturer/assistants", "**/api/lecturer/assistants*");
    cy.intercept("POST", "**/api/lecturer/assistants").as("create");

    cy.contains("button", "Tambah Asisten").click();
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').first().click(); // mata kuliah
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').first().click(); // mahasiswa
    cy.submitForm();

    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
  });
});
