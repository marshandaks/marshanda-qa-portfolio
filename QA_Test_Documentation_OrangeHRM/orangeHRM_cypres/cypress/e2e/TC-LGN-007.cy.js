describe('Login OrangeHRM', () => {
    it('TC-LGN-007 Login dengan password kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type('Admin')
      cy.get('button[type="submit"]').click()
      cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })
  })
  