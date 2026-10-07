/// <reference types="cypress" />
// Ref: AUT-017 s.d. AUT-019, AUT-022 | BAB V Tabel 5.40 & 5.43 | MTC-FAC-001..005

describe("Manajemen Fakultas", () => {
  const code = `F${Date.now().toString().slice(-5)}`; // data unik per run agar test dapat diulang

  beforeEach(() => {
    cy.loginAs("admin");
    cy.intercept("GET", "**/api/admin/faculties*").as("getFaculties");
    cy.visit("/dashboard/academic/faculties");
    cy.wait("@getFaculties");
  });

  it("AUT-017 – Tambah fakultas dengan data valid", () => {
    cy.intercept("POST", "**/api/admin/faculties").as("createFaculty");
    cy.contains("button", "Tambah Fakultas").click();
    cy.get('input[name="code"]').type(code);
    cy.get('input[name="name"]').type("Fakultas Uji Otomasi");
    cy.get('input[name="dean"]').type("Dr. Uji Otomasi");
    cy.get('button[type="submit"]').click();

    cy.wait("@createFaculty").its("response.statusCode").should("be.oneOf", [200, 201]);
    cy.contains("Fakultas Uji Otomasi").should("be.visible");
  });

  it("AUT-018 – Tambah fakultas dengan field wajib kosong menampilkan peringatan", () => {
    cy.contains("button", "Tambah Fakultas").click();
    cy.get('button[type="submit"]').click();

    cy.get('input[name="code"]:invalid, [role="alert"], .text-destructive').should("exist");
  });

  it("AUT-019a – Ubah data fakultas", () => {
    cy.intercept("PUT", "**/api/admin/faculties/*").as("updateFaculty");
    cy.rowAction("Edit");
    cy.get('input[name="name"]').clear().type("Fakultas Diperbarui");
    cy.get('button[type="submit"]').click();
    cy.wait("@updateFaculty").its("response.statusCode").should("eq", 200);
    cy.contains("Fakultas berhasil diperbarui").should("be.visible");
  });

  it("AUT-019b – Hapus fakultas melalui menu aksi", () => {
    cy.intercept("DELETE", "**/api/admin/faculties/*").as("deleteFaculty");
    cy.rowAction("Hapus");
    cy.get("button").contains("Hapus").click();

    cy.wait("@deleteFaculty").its("response.statusCode").should("eq", 200);
    cy.contains("Fakultas berhasil dihapus").should("be.visible");
  });

  it("AUT-022 – Hapus fakultas yang memiliki relasi ditolak dengan pesan jelas", () => {
    cy.intercept("DELETE", "**/api/admin/faculties/*").as("deleteFaculty");
    cy.rowAction("Hapus");
    cy.get("button").contains("Hapus").click();

    cy.wait("@deleteFaculty").its("response.statusCode").should("be.oneOf", [400, 409]);
    cy.contains(/internal server error/i).should("not.exist"); // regresi BUG-002
  });
});
