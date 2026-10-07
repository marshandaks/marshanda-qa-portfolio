/// <reference types="cypress" />
// Ref: AUT-023 | BAB V Tabel 5.44 | MTC-LEC-001

describe("Dosen – Mata Kuliah yang Diampu", () => {
  it("AUT-023 – Daftar mata kuliah dosen tampil", () => {
    cy.loginAs("lecturer");
    cy.openList("/dashboard/lecturer/courses", "**/api/lecturer/courses*");
    cy.get("table tbody tr, [data-slot='card']").should("have.length.greaterThan", 0);
  });
});
