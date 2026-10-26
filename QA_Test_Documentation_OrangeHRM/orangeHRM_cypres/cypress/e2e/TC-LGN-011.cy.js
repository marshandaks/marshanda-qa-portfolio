
describe('Login OrangeHRM', () => {
    it('TC-LGN-011 Login dengan karakter spesial', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type("' OR '1'='1")
      cy.get('[name="password"]').type("' OR '1'='1")
      cy.get('button[type="submit"]').click()
      cy.contains('Invalid credentials').should('be.visible')
    })
  })
  