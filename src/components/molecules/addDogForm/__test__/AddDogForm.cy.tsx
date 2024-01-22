import AddDogForm from '../AddDogForm'
import { BrowserRouter } from 'react-router-dom'

describe('DogInfo.cy.tsx', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <AddDogForm />
      </BrowserRouter>
    )
  })
  it('Should Render', () => {
    //should render the form empty
    cy.get('input[id=DogName]').should('have.value', '')
    cy.get('input[id=Breed]').should('have.value', '')
    cy.get('input[id=Age]').should('have.value', '')
    cy.get('label[id="demo-simple-select-label"]').should('contain', 'Status')
  })
  it('Form Validation', () => {
    cy.contains('Save').click()
    //should display the error messages
    cy.get('p[id="DogName-helper-text"]').should('contain', 'Required')
    cy.get('p[id="Breed-helper-text"]').should('contain', 'Required')
    cy.get('p[id="Age-helper-text"]').should('contain', 'Required')
    cy.get('div[id="Status-helper-text"]').should('contain', 'Required')
  })

  it('Cancel Edit', () => {
    cy.get('input[id=DogName]').clear().type('Buddy')
    cy.get('input[id=Breed]').clear().type('Golden Retriever')
    cy.get('input[id=Age]').clear().type('5')
    cy.get('div[role="combobox"]').click()
    cy.get('li[data-value="NotAdopted"]').click()
    cy.contains('Cancel').click()
    //should maintain the original data
    cy.url().should('eq', 'http://localhost:3001/')
  })
})
