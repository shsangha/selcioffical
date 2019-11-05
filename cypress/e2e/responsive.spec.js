describe("tests the rwd features that are specific to viewport size (not much bc of flexbox)", () => {
  it("shows/hides menu toggle based on viewport", () => {
    cy.visit("/")

    cy.findByTestId("menuButton").should("not.be.visible")
    cy.get("[data-cy=formToggle]").should("be.visible")

    cy.viewport(400, 400)

    cy.findByTestId("menuButton").should("be.visible")
    cy.get("[data-cy=formToggle]").should("be.visible")

    cy.viewport(300, 300)
    cy.findByTestId("menuButton").should("be.visible")
    cy.get("[data-cy=formToggle]").should("not.be.visible")
  })
})
