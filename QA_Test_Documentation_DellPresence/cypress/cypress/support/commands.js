// Login sekali per role, sesi di-cache oleh cy.session agar test lain tidak mengulang login.
Cypress.Commands.add("loginAs", (role = "admin") => {
  const user = Cypress.env(`${role}User`);
  const pass = Cypress.env(`${role}Password`);

  cy.session([role, user], () => {
    cy.intercept("POST", "**/api/auth/login").as("login");
    cy.visit("/login");
    cy.get('input[id="username"]').type(user);
    cy.get('input[id="password"]').type(pass, { log: false });
    cy.get('button[type="submit"]').click();
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard");
  });
});

// Buka menu aksi (titik tiga) pada baris pertama tabel lalu pilih item menu.
Cypress.Commands.add("rowAction", (label) => {
  cy.get('button[data-slot="dropdown-menu-trigger"]').first().click();
  cy.get('div[role="menuitem"]').contains(label).click();
});

// Isi form berdasarkan atribut name, mis. cy.fillForm({ code: "GD9", name: "Gedung 9" })
Cypress.Commands.add("fillForm", (fields) => {
  Object.entries(fields).forEach(([name, value]) => {
    cy.get(`input[name="${name}"]`).clear().type(String(value));
  });
});

// Klik tombol submit pada dialog/form yang sedang terbuka.
Cypress.Commands.add("submitForm", () => cy.get('button[type="submit"]').click());

// Konfirmasi dialog hapus.
Cypress.Commands.add("confirmDelete", () => cy.get("button").contains("Hapus").click());

// Verifikasi toast notifikasi tampil.
Cypress.Commands.add("expectToast", (text) => cy.contains(text, { timeout: 10000 }).should("be.visible"));

// Buka halaman daftar dan tunggu API list selesai (alias @list).
Cypress.Commands.add("openList", (path, apiPattern) => {
  cy.intercept("GET", apiPattern).as("list");
  cy.visit(path);
  cy.wait("@list");
});
