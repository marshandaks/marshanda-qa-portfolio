/// <reference types="cypress" />
// Ref: AUT-020 | BAB V Tabel 5.41 | MTC-SCH-001

describe("Jadwal Perkuliahan", () => {
  beforeEach(() => {
    cy.loginAs("admin");
    cy.intercept("GET", "**/api/admin/schedules*").as("getSchedules");
    cy.visit("/dashboard/schedules/manage");
    cy.wait("@getSchedules");
  });

  it("AUT-020a – Tambah jadwal perkuliahan", () => {
    cy.intercept("POST", "**/api/admin/schedules").as("create");
    cy.contains("button", "Tambah Jadwal").click();
    for (let i = 0; i < 3; i++) { // mata kuliah, kelompok, ruangan
      cy.get('[role="combobox"]').eq(i).click();
      cy.get('[role="option"]').first().click();
    }
    cy.submitForm();
    cy.wait("@create").its("response.statusCode").should("be.oneOf", [200, 201]);
  });

  it("AUT-020b – Hapus jadwal perkuliahan", () => {
    cy.intercept("DELETE", "**/api/admin/schedules/*").as("deleteSchedule");
    cy.rowAction("Hapus");
    cy.get("button").contains("Hapus").click();

    cy.wait("@deleteSchedule").its("response.statusCode").should("eq", 200);
    cy.contains("Jadwal perkuliahan telah berhasil dihapus").should("be.visible");
  });
});
