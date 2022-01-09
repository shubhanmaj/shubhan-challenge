export class SignUp{

    emailBlank(){
        cy.get('.error-messages > li').should("contain", "email can't be blank")
    }
    userNameBlank(){
        cy.get('.error-messages > li').should("contain", "username can't be blank")
    }
    passwordBlank(){
        cy.get('.error-messages > li').should("contain", "password can't be blank")
    }
    userNameTaken(){
        cy.get('.error-messages > li').should("contain", "username has already been taken")
    }
    userEmailTaken(){
        cy.get('.error-messages > li').should("contain", "email has already been taken")
    }
}

export const onSignUp = new SignUp()