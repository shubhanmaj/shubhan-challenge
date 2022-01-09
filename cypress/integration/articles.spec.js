///<reference types = "Cypress"/>

describe("Test with API",()=>{
    beforeEach(() => {
        cy.intercept({method: "GET", path:"articles/feed*"}, {"articles":[],"articlesCount":0})
        cy.intercept({method:"GET", path:"articles*"}, {fixture: 'articles.json'})
         cy.loginToApplication()
    })

    it('Create an article using UI', () => {

        cy.intercept("POST", "https://api.realworld.io/api/articles").as("postArticle")
        cy.contains("New Post").click()
        cy.get(':nth-child(1) > .form-control').type("My first article-0010")//use an unique number
        cy.get(':nth-child(2) > .form-control').type("My first article subject")
        cy.get(':nth-child(3) > .form-control').type("My first article description")
        cy.get('.btn').click()

        cy.wait("@postArticle")
        cy.get("@postArticle").then((xhr) => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
        })    
    });
    it('Create an article using API', () => {
        const userLogin = {
                "user": {
                    "email": "user34@email.com",
                    "password": "340000"
                }
            }
        const title = "Article " + parseInt(Math.random()*100)
        const bodyRequest ={
                "article": {
                    "title": title,
                    "description": "My first create ",
                    "body": "My first article description",
                    "tagList": []
                }
            }
        cy.request("POST", "https://api.realworld.io/api/users/login", userLogin )
        .its("body").then((body) => {
            const token = body.user.token

            cy.request({
                url: "https://api.realworld.io/api/articles",
                headers: {"Authorization": "Token " + token},
                method: "POST",
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(200)
            })
        })
    })
    it("Creating/mocking articles from fixture", ()=>{
        cy.contains("Global Feed").click()
        cy.contains("Article 14").should("be.visible")
        cy.contains("Article 8").should("be.visible")
    })
    it("Delete an article", ()=>{
        const userLogin = {
            "user": {
                "email": "user34@email.com",
                "password": "340000"
            }
        }
        const title = "Delete My Article-1003"
        const bodyRequest ={
                "article": {
                    "title": "Delete My Article-1003", //Title must be unique
                    "description": "Delete My article" ,
                    "body": "My first article description",
                    "tagList": []
                }
            }
        cy.request("POST", "https://api.realworld.io/api/users/login", userLogin )
        .its("body").then((body) => {
            const token = body.user.token
            
            cy.request({
                url: "https://api.realworld.io/api/articles",
                headers: {"Authorization": "Token " + token},
                method: "POST",
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(200)
            })
            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.btn btn-outline-danger btn-sm').contains('Delete Article').click()

            cy.request({
                url: 'https://api.realworld.io/api/articles?offset=0',
                headers: { 'Authorization': 'Token '+token},
                method: 'GET'
            }).its('body').then( body => {
                console.log(body)
                expect(body.articles[0].title).not.to.equal("Delete My Article-1003")
        })
   
})
})
})
describe('Delete the newly created article',()=>{
    beforeEach(() => {
         cy.loginToApplication()
    })
    it("Delete an article", ()=>{
        const userLogin = {
            "user": {
                "email": "user34@email.com",
                "password": "340000"
            }
        }
        const title = "Delete My Article-1004"
        const bodyRequest ={
                "article": {
                    "title": "Delete My Article-1008", //Title must be unique
                    "description": "Delete My article" ,
                    "body": "My first article description",
                    "tagList": []
                }
            }
        cy.request("POST", "https://api.realworld.io/api/users/login", userLogin )
        .its("body").then((body) => {
            const token = body.user.token
            
            cy.request({
                url: "https://api.realworld.io/api/articles",
                headers: {"Authorization": "Token " + token},
                method: "POST",
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(200)
            })
            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.btn btn-outline-danger btn-sm').contains('Delete Article').click()

            cy.request({
                url: 'https://api.realworld.io/api/articles?offset=0',
                headers: { 'Authorization': 'Token '+token},
                method: 'GET'
            }).its('body').then( body => {
                console.log(body)
                expect(body.articles[0].title).not.to.equal("Delete My Article-1008")
        })
    })
})
})