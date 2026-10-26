describe('Login OrangeHRM', () => {
    it('TC-LGN-010 Memastikan password tersamarkan', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="password"]').type('admin123')
      cy.get('[name="password"]').should('have.attr', 'type', 'password')
    })
  })
  