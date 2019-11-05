describe("checks that tabtrapping is working", () => {
  it("traps focus in the form", () => {
    cy.visit("/")

    cy.get("[data-cy=formToggle]").click()

    cy.findByTestId("name").focused()

    cy.tab()

    cy.findByTestId("email").focused()

    cy.tab()

    cy.findByTestId("subject").focused()
    cy.tab()

    cy.findByTestId("message").focused()

    cy.tab()

    cy.findByTestId("submitBtn").focused()
    cy.tab()

    cy.findByTestId("name").focused()

    cy.tab({ shift: true })
    cy.findByTestId("submitBtn").focused()

    cy.window().trigger("keydown", { keyCode: 27 })

    cy.get("[data-cy=contactForm]").should("not.exist")
  })
})

//for these tests all the validation is tested super high depth in jest so really just care how the form responds to success/error

describe("happy path", () => {
  it("works ", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch", () => {
          return new Promise(resolve =>
            resolve({
              status: 200,
              json() {
                return {}
              },
            })
          )
        })
      },
    })

    cy.get("[data-cy=formToggle]").click()

    cy.findByTestId("name").type("Name")
    cy.findByTestId("email").type("validemail@shaw.ca")
    cy.findByTestId("subject").type("Subject")
    cy.findByTestId("message").type("message")
    cy.findByTestId("submitBtn").click()

    cy.get("[data-cy=contactForm]").should("not.exist")
  })
})
describe("unhappy path", () => {
  it("works ", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch", () => {
          return new Promise(resolve =>
            resolve({
              status: 400,
              json() {
                return {}
              },
            })
          )
        })
      },
    })

    cy.get("[data-cy=formToggle]").click()

    cy.findByTestId("name").type("Name")
    cy.findByTestId("email").type("validemail@shaw.ca")
    cy.findByTestId("subject").type("Subject")
    cy.findByTestId("message").type("message")
    cy.findByTestId("submitBtn").click()

    cy.get("[data-cy=contactForm]").should("exist")
  })
})
