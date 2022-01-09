///<reference types ="Cypress"/>
// const { copyFileSync } = require("fs")
import { onSignUp } from "../support/page_objects/signUp";

describe.skip("Sign up with positive values", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.contains("Sign up").click();
      cy.wait(2000);
  
    });
    //Scenarios: Sign up with positive values
    it("Sign up with all positive values", () => {
        let randomNum = parseInt(Math.random()*100);
        let userName = `user${randomNum}`
        let userEmail = `${userName}@email.com`
        let password = randomNum * 10000
      cy.signUp(userName, userEmail, password )
      cy.get(":nth-child(4) > .nav-link > span").should("contain", `${userName}`);
    });
  });
describe("Sign Up test suit", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign up").click();
    cy.wait(2000);
    cy.fixture("signUp").as("users")
  });
//Scenarios: attempt to sign with blank inputs
  it("Sign up with blank value", () => {
    // cy.signUp(" ", " ", " ");
    cy.get('.btn').click()
    onSignUp.emailBlank();
  });
//Scenarios: attempt to sign up with blank userName
  it("Sign up with blank Username", () => {
    cy.get("@users").then((users) => {
        cy.signUp(" ", users.userEmail, users.password);
    })
    onSignUp.userNameBlank();
  });
//Scenarios: attempt to sign up with blank Password value
  it("Sign up with blank Password value", () => {
    cy.get("@users").then((users) => {
        cy.signUp(users.userName, users.userEmail, " ");
    })
    onSignUp.passwordBlank();
  });
  //Scenarios: attempt to sing up with already existing user (only check the username taken error msg)
  it("Sign up with already registered users", () => {
    cy.get("@users").then((users) => {
        cy.signUp(users.userName, users.userEmail, users.password);
    })
    onSignUp.userNameTaken();
  });
  //Scenarios: attempt to sing up with already existing user(check the both error msgs)
  it("Sign up with already registered users", () => {
    cy.get("@users").then((users) => {
        cy.signUp(users.userName, users.userEmail, users.password);
    })
    onSignUp.userNameTaken();
    onSignUp.userEmailTaken();
  });
});

