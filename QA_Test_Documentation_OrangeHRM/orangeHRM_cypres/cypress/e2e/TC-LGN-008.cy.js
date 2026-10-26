describe('Login OrangeHRM', () => {
    it('TC-LGN-008 Login dengan username huruf kecil', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('[name="username"]').type('admin')
      cy.get('[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
      cy.contains('Invalid credentials').should('be.visible')
    })
  })
  