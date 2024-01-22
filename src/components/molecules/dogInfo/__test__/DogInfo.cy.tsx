import DogInfo from '../DogInfo'

const dog = {
  id: '1',
  name: 'Buddy',
  breed: 'Golden Retriever',
  age: 5,
  status: 'NotAdopted',
  ownerId: '1',
  imageUrl: 'https://placedog.net/500/280?id=1',
}

describe('DogInfo.cy.tsx', () => {
  beforeEach(() => {
    cy.mount(<DogInfo dog={dog} />)
  })

  it('Should Render', () => {
    //should render the data
    cy.get('input[id=DogName]').should('have.value', 'Buddy')
    cy.get('input[id=Breed]').should('have.value', 'Golden Retriever')
    cy.get('input[id=Age]').should('have.value', '5')
    cy.get('input[name="Status"]').should('have.value', 'NotAdopted')

    //should not be able to edit
    cy.get('input[id=DogName]').should('be.disabled')
    cy.get('input[id=Breed]').should('be.disabled')
    cy.get('input[id=Age]').should('be.disabled')
    cy.get('input[name="Status"]').should('be.disabled')
  })

  it('Cancel Edit', () => {
    cy.get('button[id=editDogInfo]').click()

    //should be able to edit
    cy.get('input[id=DogName]').clear().type('Buddy2')
    cy.get('input[id=Breed]').clear().type('Golden Retriever2')
    cy.get('input[id=Age]').clear().type('6')
    cy.get('div[role="combobox"]').click()
    cy.get('li[data-value="NotAdopted"]').click()

    cy.contains('Cancel').click()

    //should maintain the original data

    cy.get('input[id=DogName]').should('have.value', 'Buddy')
    cy.get('input[id=Breed]').should('have.value', 'Golden Retriever')
    cy.get('input[id=Age]').should('have.value', '5')
    cy.get('input[name="Status"]').should('have.value', 'NotAdopted')
  })

  it('Form Validation', () => {
    cy.get('button[id=editDogInfo]').click()

    //should clean all the fields

    cy.get('input[id=DogName]').clear()
    cy.get('input[id=Breed]').clear()
    cy.get('input[id=Age]').clear()

    cy.contains('Save').click()

    //should display the error messages

    cy.get('p[id="DogName-helper-text"]').should('contain', 'Required')
    cy.get('p[id="Breed-helper-text"]').should('contain', 'Required')
    cy.get('p[id="Age-helper-text"]').should('contain', 'Required')
  })
})
