describe('Full Battleship scenario', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000');

  });



  it('Successful authorization and switch to the board', () => {


    cy.get('input[type="email"]').type('admiral@fleet.com');

    cy.get('input[type="password"]').type('sinkThemAll');



    cy.get('button').contains('Enter').click();


    cy.contains('Your ships').should('be.visible');

    

    cy.get('.game-cell').should('have.length.at.least', 100);

  });

});