describe('Login OrangeHRM', () => {
    it('TC-LGN-012 Fungsi link Forgot your password?', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.contains('Forgot your password?').click()
      cy.url().should('include', '/auth/requestPasswordResetCode')
      cy.get('[name="username"]').should('be.visible').type('Admin')
      cy.contains('Reset Password').should('be.visible').click()
    })
  })