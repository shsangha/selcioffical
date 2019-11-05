/* eslint-disable jest/valid-expect-in-promise */
describe("tests the music page for functionality and a11y", () => {
  it("can access all player functionality with just the keyboard", () => {
    cy.visit("/music")

    cy.get("[data-cy=playBtn0]").should("not.be.disabled")

    cy.get("[data-cy=playBtn0]").focus()

    cy.tab()

    cy.get("[data-cy=progress0]").focused()

    cy.tab({ shift: true })

    cy.get("[data-cy=playBtn0]").focused()
  })

  it("tracks as expected", () => {
    cy.visit("/music")

    cy.get("[data-cy=playBtn0]").should("not.be.disabled")
    cy.get("[data-cy=playBtn0]").click()
    cy.get("[data-cy=pauseBtn0]").click()

    cy.get("[data-cy=progress0]").then(progress => {
      const offsetLeft = progress[0].offsetLeft
      const offsetWidth = progress[0].offsetWidth

      const pageX = offsetWidth / 2 + offsetLeft

      cy.get("[data-cy=progress0]").trigger("click", {
        pageX,
      })
    })

    cy.get("[data-cy=progress0]").should("have.attr", "value", "50")

    cy.get("[data-cy=progress0]").trigger("keydown", { keyCode: 37 })

    cy.get("[data-cy=playerAudio0]").then(audio => {
      const duration = audio[0].duration

      cy.get("[data-cy=progress0]").should(
        "have.attr",
        "value",
        `${((duration / 2 - 5) / duration) * 100}`
      )
    })

    cy.get("[data-cy=progress0]").trigger("keydown", { keyCode: 39 })

    cy.get("[data-cy=progress0]").should("have.attr", "value", "50")
  })

  it("starts with all audio paused", () => {
    cy.visit("/music")

    cy.get("[data-cy^=playerAudio]").then(players => {
      for (let i = 0; i < 4; i++) {
        expect(players[i].currentTime).equal(0)
        expect(players[i].paused).equal(true)
        cy.get(`[data-cy=pauseBtn${i}]`).should("not.exist")
        cy.get(`[data-cy=playBtn${i}]`).should("exist")
      }
    })
  })

  it("only allows one player to run at a time", () => {
    cy.visit("/music")

    cy.get("[data-cy^=pauseBtn]").should("not.exist")

    cy.get("[data-cy=playBtn0]").click()
    cy.get("[data-cy=pauseBtn0]").should("exist")
    cy.get("[data-cy=playBtn0]").should("not.exist")

    cy.get("[data-cy=playerAudio0]").then(player => {
      expect(player[0].paused).equal(false)
    })

    cy.get("[data-cy^=playerAudio]").then(players => {
      for (let i = 1; i < 4; i++) {
        expect(players[i].paused).equal(true)
        cy.get(`[data-cy=pauseBtn${i}]`).should("not.exist")
        cy.get(`[data-cy=playBtn${i}]`).should("exist")
      }
    })

    cy.get("[data-cy=playBtn3]").click()
    cy.get("[data-cy=pauseBtn3]").should("exist")
    cy.get("[data-cy=playBtn3]").should("not.exist")

    cy.get("[data-cy=playerAudio3]").then(player => {
      expect(player[0].paused).equal(false)
    })

    cy.get("[data-cy^=playerAudio]").then(players => {
      for (let i = 0; i < 3; i++) {
        expect(players[i].paused).equal(true)
        cy.get(`[data-cy=pauseBtn${i}]`).should("not.exist")
        cy.get(`[data-cy=playBtn${i}]`).should("exist")
      }
    })
  })
})
