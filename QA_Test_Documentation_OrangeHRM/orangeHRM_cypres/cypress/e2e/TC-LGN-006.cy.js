describe('Login OrangeHRM', () => {
    it('TC-LGN-006 Login dengan username kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
      cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })
  })
  