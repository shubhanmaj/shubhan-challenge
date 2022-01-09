// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('signUp',(uName, uEmail, password)=>{ 
    cy.get(':nth-child(1) > .form-control').type(uName)
    cy.get(':nth-child(2) > .form-control').type(uEmail)
    cy.get(':nth-child(3) > .form-control').type(password)
    cy.get(".btn").click()
})
Cypress.Commands.add('signIn', (uEmail, password)=>{ 
    cy.get(':nth-child(1) > .form-control').type(uEmail)
    cy.get(':nth-child(2) > .form-control').type(password)
    cy.get(".btn").click();
})
Cypress.Commands.add("loginToApplication", ()=>{
    const userLogin = {
        "user": {
            "email": "user34@email.com",
            "password": "340000"
        }
    }
    const userToken = {
            "user": {
            "email": "user34@email.com",
            "username": "user34",
            "bio": null,
            "image": null,
            "token": ""
            }
            
    }

    cy.request("POST", "https://api.realworld.io/api/users/login", userLogin )
    .its("body").then((body) => {
        const token = body.user.token
        userToken.token = token
        cy.wrap(userToken.token).as('tokenOnly')

    cy.visit("http://localhost:3000/",{
        onBeforeLoad(win){
            win.localStorage.setItem('user', JSON.stringify(userToken))  
           }
        })
        cy.get('nav').contains('Home').click()

    // cy.get(':nth-child(2) > .nav-link').click()
    // cy.get(':nth-child(1) > .form-control').type("user34@email.com")
    // cy.get(':nth-child(2) > .form-control').type("340000")
    // cy.get(".btn").click();
})
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
