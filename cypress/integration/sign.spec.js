///<reference types = "Cypress"/>
import { onSignIn } from "../support/page_objects/signIn";

describe("Sign in suit", ()=>{
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.contains("Sign in").click();
        cy.wait(2000);
        cy.fixture("signIn").as("users")
      });
      //Scenario: attempt to sign in without userEmail and password
      it('Sign in without userEmail and password', () => {
          cy.get(".btn").click();
         onSignIn.emailBlank()
      });
      //Scenario: attempt to sign in without password
      it('Sign in without password', () => {
          cy.get("@users").then((users) => {
        cy.signIn(users.validUserEmail, " ")
          })
        onSignIn.passwordBlank();
    });
      //Scenario: attempt to sign in with invalid userEmail and password
      it('Sign in with invalid userEmail and password', () => {
        cy.get("@users").then((users) => {
            cy.signIn(users.invalidUserEmail, users.invalidPassword)
              })
       onSignIn.invalidUserNamePassword()

    });

    //Scenario: Sign In With valid email and password
    it('Sign in with invalid userEmail and password', () => {
        cy.get("@users").then((users) => {
            cy.signIn(users.validUserEmail, users.validPassword)
              })
        onSignIn.successfullyLogin()
    });
})