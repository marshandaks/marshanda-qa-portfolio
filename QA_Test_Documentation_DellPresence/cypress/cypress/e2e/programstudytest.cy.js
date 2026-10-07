/// <reference types="cypress" />
// Ref: AUT-010, AUT-011 | BAB V Tabel 5.34 | MTC-PRG-001/002

describe("Program Studi Test", () => {
  const code = `PS${Date.now().toString().slice(-4)}`;

  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/academic/study-programs", "**/api/admin/study-programs*");
  });

  it("AUT-010 – Tambah Program Studi Dengan Data Valid", () => {
    cy.intercept("POST", "**/api/admin/study-programs").as("create");
    cy.contains("button", "Tambah Program Studi").click();
    cy.fillForm({ code, name: "Program Studi Uji Otomasi" });
    cy.get('[role="combobox"]').first().click(); // fakultas
    cy.get('[role="option"]').first().click();
    cy.submitForm();

    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
    cy.contains("Program Studi Uji Otomasi").should("be.visible");
  });

  it("AUT-011a – Edit Program Studi Dengan Data Valid", () => {
    cy.intercept("PUT", "**/api/admin/study-programs/*").as("update");
    cy.rowAction("Edit");
    cy.fillForm({ name: "Program Studi Diperbarui" });
    cy.submitForm();
    cy.wait("@update").its("response.statusCode").should("eq", 200);
  });

  it("AUT-011b – Hapus Program Studi", () => {
    cy.intercept("DELETE", "**/api/admin/study-programs/*").as("remove");
    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
    cy.expectToast("Program studi berhasil dihapus");
  });
});
