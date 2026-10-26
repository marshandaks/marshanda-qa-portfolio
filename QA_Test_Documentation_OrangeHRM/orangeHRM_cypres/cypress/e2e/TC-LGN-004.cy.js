describe('Login OrangeHRM', () => {
  it('TC-LGN-004 - Login dengan username dan password salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('user123')
    cy.get('[name="password"]').type('pass123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')
  })
})