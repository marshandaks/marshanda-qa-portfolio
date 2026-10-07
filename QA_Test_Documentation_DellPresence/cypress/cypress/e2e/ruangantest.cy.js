/// <reference types="cypress" />
// Ref: AUT-012 | BAB V Tabel 5.35 | MTC-RMS-001/002

describe("Manajemen Ruangan", () => {
  const code = `R${Date.now().toString().slice(-4)}`;

  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/academic/rooms", "**/api/admin/rooms*");
  });

  it("AUT-012a – Tambah ruangan", () => {
    cy.intercept("POST", "**/api/admin/rooms").as("create");
    cy.contains("button", "Tambah Ruangan").click();
    cy.fillForm({ code, name: "Ruang Uji Otomasi", floor: 2, capacity: 40 });
    cy.get('[role="combobox"]').first().click(); // gedung
    cy.get('[role="option"]').first().click();
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
  });

  it("AUT-012b – Ubah ruangan", () => {
    cy.intercept("PUT", "**/api/admin/rooms/*").as("update");
    cy.rowAction("Edit");
    cy.fillForm({ capacity: 45 });
    cy.submitForm();
    cy.wait("@update").its("response.statusCode").should("eq", 200);
  });

  it("AUT-012c – Hapus ruangan", () => {
    cy.intercept("DELETE", "**/api/admin/rooms/*").as("remove");
    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
  });

  it("Regresi BUG-004 – kapasitas negatif harus ditolak", () => {
    cy.intercept("POST", "**/api/admin/rooms").as("create");
    cy.contains("button", "Tambah Ruangan").click();
    cy.fillForm({ code: `${code}N`, name: "Ruang Kapasitas Negatif", capacity: -10 });
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [400, 422]);
  });
});
