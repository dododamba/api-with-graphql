const updateModule = require('../../../products/usecase/update')

describe(':update(fileHandler, id, name, price, weight', () => {
  describe('when id is not precise', () => {
    it('throws InvalidIdError', async () => {
      const fileHandlers = {products: {read: jest.fn(() => [{id: 0, name: "banana", price: 0, weight: 0}])}}
      const {update, InvalidIdError} = updateModule(fileHandlers.products)
      await expect(update(null, null, null, null)).rejects.toEqual(new InvalidIdError('ID undefined'))
    })
  })
  describe('when product does not exist', () => {
    it('throws InvalidIdError', async () => {
      const fileHandlers = {products: {read: jest.fn(() => [{id: 0, name: "banana", price: 0, weight: 0}])}}
      const {update, InvalidIdError} = updateModule(fileHandlers.products)
      await expect(update(2, null, null, null)).rejects.toEqual(new InvalidIdError('The product does not exist'))
    })
  })
  describe('when only the id is specified', () => {
    it('returns the product without modif', async () => {
      const products = [{id: 1, name: "banana", price: 0, weight: 0}]
      const fileHandlers = {products: {read: jest.fn(() => products), write: jest.fn()}}
      const {update} = updateModule(fileHandlers.products)
      await expect(update(1, null, null, null)).resolves.toEqual(products)
    })
  })
  describe('when something is specified', () => {
    it('returns the product with the modif', async () => {
      const products = [{id: 1, name: "banana", price: 0, weight: 0}]
      const fileHandlers = {products: {read: jest.fn(() => products), write: jest.fn()}}
      const {update} = updateModule(fileHandlers.products)
      const result = await update(1, 'orange', null, null)
      expect(result[0].name).toEqual('orange')
    })
  })
})