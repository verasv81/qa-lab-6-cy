Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  debugger
  return false
})


context('Women feature', () => {
  beforeEach(() => {
    cy.visit('https://adoring-pasteur-3ae17d.netlify.app/womens.html');
  })

  it('should search for Skirt', () => {
    cy.get('input[name="search"]').type('Skirt{enter}');
    const element = cy.get('a');
    if (element) {
      element.contains('Skirt');
    }
  });

  it('should load product details', () => {
    const product = 'A-line Black Skirt';
    cy.get('a').contains(product).click();
    cy.get('h3').contains(product);
  });

  it('should fail when adding to cart non-integer values', () => {
    cy.get('input[value="Add to cart"]').first().click();
    cy.get('.minicart-quantity').type('mystring1');
  });

  it('should sort A-Z', () => {
    cy.get('#country1').select(['Name(A - Z)']);
    cy.get('.item-info-product a').then($elements => {
      const strings = Array.from($elements).map(el => el.innerHTML);
      const sortedAZ = strings.slice().sort(function (a, b) {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      });

      expect(strings).to.deep.equal(sortedAZ);
    });
  });

  it('should sort Z-A', () => {
    cy.get('#country1').select(['Name(Z - A)']);
    cy.get('.item-info-product a').then($elements => {
      const strings2 = Array.from($elements).map(el => el.innerHTML);
      const sortedZA = strings2.slice().sort(function (a, b) {
        if (a < b) return 1;
        else if (a > b) return -1;
        return 0;
      });
      console.log(strings2);
      console.log(sortedZA);
      expect(strings2).to.deep.equal(sortedZA);
    });
  });

  it('should sort Price(High-Low)', () => {
    cy.get('#country1').select(['Price(High - Low)']);
    cy.get('.item_price').then($elements => {
      const strings4 = Array.from($elements).map(el => el.innerHTML);
      const sortedHL = strings4.slice().sort(function (a, b) {
        if (a > b) return -1;
        else if (a < b) return 1;
        return 0;
      });
      cy.wrap(strings4).should("deep.eq", sortedHL);
    });
  });

  it('should sort Price(Low - High)', () => {
    cy.get('#country1').select(['Price(Low - High)']);
    cy.get('.item_price').then($elements => {
      const strings5 = Array.from($elements).map(el => el.innerHTML);
      const sortedLH = strings5.slice().sort(function (a, b) {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      });

      cy.wrap(strings5).should("deep.eq", sortedLH);
    });
  });

  it('should open a dialog when submiting community poll', () => {
    cy.get(':nth-child(4) > .radio > label > i').click();
    cy.get('.swit > form > [type="submit"]').click();
  });
});


