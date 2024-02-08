const NO_OF_CHILDREN = 20;

describe("Verify UI elements", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win.console, "log").as("consoleLog");
        cy.stub(win, "prompt").returns(NO_OF_CHILDREN);
      },
    });
  });

  it("Verify child elements created", () => {
    cy.get("#container").children().should("have.length", NO_OF_CHILDREN);
  });

  it("Verify all child elements have black background color", () => {
    cy.get("#container")
      .children()
      .should("have.css", "background-color", "rgb(0, 0, 0)");
  });

  it("Verify box on state", () => {
    cy.get("#container")
      .children()
      .first()
      .click()
      .should("have.css", "background-color", "rgb(0, 0, 255)");
  });

  it("Verify box off state", () => {
    cy.get("#container")
      .children()
      .first()
      .click()
      .click()
      .should("have.css", "background-color", "rgb(0, 0, 0)");
  });

  it("Verify box on state message", () => {
    cy.get("#container").children().first().click();
    cy.get("@consoleLog").should("be.calledWith", "Turning ON 1");
  });

  it("Verify box off state message", () => {
    cy.get("#container").children().first().click().click();
    cy.get("@consoleLog").should("be.calledWith", "Turning OFF 1");
  });
});
