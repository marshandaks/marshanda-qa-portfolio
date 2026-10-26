describe('Login OrangeHRM', () => {
    it('TC-LGN-001 Login berhasil dengan akun valid', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type('Admin')
      cy.get('[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/dashboard')
    })
  })