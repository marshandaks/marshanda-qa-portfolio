/// <reference types="cypress" />
// Ref: AUT-024 | BAB V Tabel 5.45

describe("Dosen – Jadwal Mengajar", () => {
  it("AUT-024 – Jadwal mengajar dosen tampil", () => {
    cy.loginAs("lecturer");
    cy.openList("/dashboard/lecturer/schedules", "**/api/lecturer/schedules*");
    cy.contains(/Jadwal Mengajar/i).should("be.visible");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
