/// <reference types="cypress" />
// Ref: AUT-001, AUT-002 | BAB V Tabel 5.30 | MTC-AUTH-001/002

describe("Login Website DelPresence", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/auth/login").as("login");
    cy.visit("/login");
  });

  it("AUT-001 – Login dengan akun valid diarahkan ke Dashboard", () => {
    cy.get('input[id="username"]').type(Cypress.env("adminUser"));
    cy.get('input[id="password"]').type(Cypress.env("adminPassword"), { log: false });
    cy.get('button[type="submit"]').click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard");
    cy.contains("Selamat datang di DelPresence Management System").should("be.visible");
  });

  it("AUT-002 – Login dengan akun tidak valid tetap di halaman login", () => {
    cy.get('input[id="username"]').type("user_tidak_terdaftar");
    cy.get('input[id="password"]').type("password_salah", { log: false });
    cy.get('button[type="submit"]').click();

    cy.wait("@login").its("response.statusCode").should("be.oneOf", [400, 401, 403]);
    cy.url().should("include", "/login");
  });
});
