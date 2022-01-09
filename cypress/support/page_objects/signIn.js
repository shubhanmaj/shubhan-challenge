export class SignIn{
    emailBlank(){
        cy.get('.error-messages > li').should("contain", "email can't be blank")
    }
  
    passwordBlank(){
        cy.get('.error-messages > li').should("contain", "password can't be blank")
    }   
    invalidUserNamePassword(){
        cy.get('.error-messages > li').should("contain", "email or password is invalid");

    }
    successfullyLogin(){
        cy.get('.container > p').should("contain","A place to share your knowledge.")
    }

  
}

export const onSignIn = new SignIn()