describe('Login OrangeHRM', () => {
    it('TC-LGN-009 Login dengan password huruf besar', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type('Admin')
      cy.get('[name="password"]').type('ADMIN123')
      cy.get('button[type="submit"]').click()
      cy.contains('Invalid credentials').should('be.visible')
    })
  })
  