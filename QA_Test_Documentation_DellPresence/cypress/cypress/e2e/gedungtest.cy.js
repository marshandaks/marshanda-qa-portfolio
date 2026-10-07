/// <reference types="cypress" />
// Ref: AUT-007, AUT-008, AUT-009 | BAB V Tabel 5.33 | MTC-BLD-001/002

describe("Manajemen Gedung", () => {
  const code = `GD${Date.now().toString().slice(-4)}`;

  beforeEach(() => {
    cy.loginAs("admin");
    cy.openList("/dashboard/academic/buildings", "**/api/admin/buildings*");
  });

  it("AUT-007 – Tambah gedung dengan data valid", () => {
    cy.intercept("POST", "**/api/admin/buildings").as("create");
    cy.contains("button", "Tambah Gedung").click();
    cy.fillForm({ code, name: "Gedung Uji Otomasi", floors: 4 });
    cy.submitForm();

    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
    cy.contains("Gedung Uji Otomasi").should("be.visible");
  });

  it("AUT-008 – Tambah gedung dengan field kosong menampilkan peringatan", () => {
    cy.contains("button", "Tambah Gedung").click();
    cy.submitForm();
    cy.get('input[name="code"]:invalid, [role="alert"], .text-destructive').should("exist");
  });

  it("AUT-008b – Regresi BUG-003: jumlah lantai negatif harus ditolak", () => {
    cy.intercept("POST", "**/api/admin/buildings").as("create");
    cy.contains("button", "Tambah Gedung").click();
    cy.fillForm({ code: `${code}X`, name: "Gedung Lantai Negatif", floors: -3 });
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [400, 422]);
  });

  it("AUT-009 – Ubah lalu hapus gedung", () => {
    cy.intercept("PUT", "**/api/admin/buildings/*").as("update");
    cy.intercept("DELETE", "**/api/admin/buildings/*").as("remove");

    cy.rowAction("Edit");
    cy.fillForm({ name: "Gedung Diperbarui" });
    cy.submitForm();
    cy.wait("@update").its("response.statusCode").should("eq", 200);
    cy.expectToast("berhasil diperbarui");

    cy.rowAction("Hapus");
    cy.confirmDelete();
    cy.wait("@remove").its("response.statusCode").should("eq", 200);
    cy.expectToast("berhasil dihapus");
  });
});
