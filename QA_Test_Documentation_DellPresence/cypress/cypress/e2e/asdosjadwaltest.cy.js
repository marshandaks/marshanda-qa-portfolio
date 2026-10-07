/// <reference types="cypress" />
// Ref: AUT-028 | BAB V Tabel 5.48

describe("Asisten Dosen – Jadwal Perkuliahan", () => {
  it("AUT-028 – Asisten dosen melihat jadwal perkuliahan", () => {
    cy.loginAs("assistant");
    cy.openList("/dashboard/assistant/schedules", "**/api/assistant/schedules*");
    cy.contains(/Jadwal/i).should("be.visible");
  });
});
