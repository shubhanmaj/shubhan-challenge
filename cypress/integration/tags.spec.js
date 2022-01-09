/// <reference types = "Cypress"/>

describe("Tags test suit", ()=>{
    beforeEach(()=>{
        cy.intercept({method: "GET", path: "tags"}, {fixture: "tags.json"})
        cy.loginToApplication()

    })
    it("Get the tag list", ()=>{
        cy.get(".tag-list")
        .should("contain", "Welcome")
        .and("contain","Cypress")
        .and("contain","Automation")}
    )
    
})