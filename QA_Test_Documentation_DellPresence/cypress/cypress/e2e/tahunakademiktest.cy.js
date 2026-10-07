/// <reference types="cypress" />
// Ref: AUT-021 | BAB V Tabel 5.42 | MTC-ACY-001/002 (regresi BUG-005)

describe("Manajemen Tahun Akademik", () => {
  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/academic/academic-years", "**/api/admin/academic-years*");
  });

  it("AUT-021a – Tambah tahun akademik dengan tanggal valid", () => {
    cy.intercept("POST", "**/api/admin/academic-years").as("create");
    cy.contains("button", "Tambah Tahun Akademik").click();
    cy.fillForm({ name: "2099/2100" });
    cy.get('input[name="startDate"]').type("2099-08-01");
    cy.get('input[name="endDate"]').type("2100-01-31");
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
  });

  it("AUT-021b – Tanggal selesai lebih awal dari tanggal mulai ditolak (BUG-005)", () => {
    cy.intercept("POST", "**/api/admin/academic-years").as("create");
    cy.contains("button", "Tambah Tahun Akademik").click();
    cy.fillForm({ name: "2098/2099" });
    cy.get('input[name="startDate"]').type("2098-08-01");
    cy.get('input[name="endDate"]').type("2098-07-01");
    cy.submitForm();
    cy.contains(/tanggal selesai/i).should("be.visible");
  });

  it("AUT-021c – Ubah lalu hapus tahun akademik", () => {
    cy.intercept("DELETE", "**/api/admin/academic-years/*").as("remove");
    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
  });
});
