const baseUrl = "http://localhost:8000"

describe("tests navigation", () =>
  it("can navigate to all the pages as expected", () => {
    cy.visit("/")
      .findByTestId("link0")
      .click()

    cy.url().should("eq", `${baseUrl}/shop`)

    cy.get("[data-cy=shopPageLink0]").should("have.attr", "href", "/about")
    cy.get("[data-cy=shopPageLink1]").should("have.attr", "href", "/music")
    cy.get("[data-cy=shopPageLink2]").should("have.attr", "href", "/shows")
    cy.get("[data-cy=shopPageLink3]").should("have.attr", "href", "/")

    cy.get("[data-cy=shopPageLink1]").click()

    cy.get("[data-cy=musicPageLink0]").should("have.attr", "href", "/shows")
    cy.get("[data-cy=musicPageLink1]").should("have.attr", "href", "/")
    cy.get("[data-cy=musicPageLink2]").should("have.attr", "href", "/shop")
    cy.get("[data-cy=musicPageLink3]").should("have.attr", "href", "/about")

    cy.get("[data-cy=musicPageLink2]").click()

    cy.get("[data-cy=shopPageLink0]").should("have.attr", "href", "/about")
    cy.get("[data-cy=shopPageLink1]").should("have.attr", "href", "/music")
    cy.get("[data-cy=shopPageLink2]").should("have.attr", "href", "/shows")
    cy.get("[data-cy=shopPageLink3]").should("have.attr", "href", "/")

    cy.get("[data-cy=shopPageLink3]").click()

    cy.get("[data-cy=PageLink0]").should("have.attr", "href", "/shop")
    cy.get("[data-cy=PageLink1]").should("have.attr", "href", "/about")
    cy.get("[data-cy=PageLink2]").should("have.attr", "href", "/music")
    cy.get("[data-cy=PageLink3]").should("have.attr", "href", "/shows")
  }))
