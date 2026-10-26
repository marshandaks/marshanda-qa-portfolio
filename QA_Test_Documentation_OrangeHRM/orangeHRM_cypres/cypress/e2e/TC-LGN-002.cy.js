describe('Login OrangeHRM', () => {
    it('TC-LGN-002 Login dengan password salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type('Admin')
      cy.get('[name="password"]').type('salah123')
      cy.get('button[type="submit"]').click()
      cy.contains('Invalid credentials').should('be.visible')
    })
  })
  