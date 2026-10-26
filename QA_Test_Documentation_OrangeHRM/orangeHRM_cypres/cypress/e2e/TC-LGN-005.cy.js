
describe('Login OrangeHRM', () => {
    it('TC-LGN-005 Login dengan kedua field kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('button[type="submit"]').click()
      cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })
  })
  