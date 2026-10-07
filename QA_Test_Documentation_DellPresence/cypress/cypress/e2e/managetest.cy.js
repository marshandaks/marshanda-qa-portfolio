/// <reference types="cypress" />
// Ref: AUT-003, AUT-004, AUT-005 | BAB V Tabel 5.31 | MTC-CRS-001

describe("Manajemen Mata Kuliah", () => {
  const code = `MK${Date.now().toString().slice(-4)}`;

  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/courses/manage", "**/api/admin/courses*");
  });

  it("AUT-003 – Tambah mata kuliah dengan data valid", () => {
    cy.intercept("POST", "**/api/admin/courses").as("create");
    cy.contains("button", "Tambah Mata Kuliah").click();
    cy.fillForm({ code, name: "Pengujian Perangkat Lunak", credits: 3 });
    cy.submitForm();

    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
    cy.contains("Pengujian Perangkat Lunak").should("be.visible");
  });

  it("AUT-004 – SKS di bawah batas minimum ditolak (validasi form)", () => {
    cy.contains("button", "Tambah Mata Kuliah").click();
    cy.fillForm({ code: "MK002", credits: 0 });
    cy.submitForm();

    cy.get('input[name="credits"]').then(($el) => {
      expect($el[0].validationMessage).to.match(/greater than or equal to 1/i);
    });
  });

  it("AUT-005 – Ubah lalu hapus mata kuliah", () => {
    cy.intercept("PUT", "**/api/admin/courses/*").as("update");
    cy.intercept("DELETE", "**/api/admin/courses/*").as("remove");

    cy.rowAction("Edit");
    cy.fillForm({ name: "Nama MK Diperbarui" });
    cy.submitForm();
    cy.wait("@update").its("response.statusCode").should("eq", 200);

    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
  });
});
