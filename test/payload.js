const assert = require('chai').assert,
  Payload = require('../index')

describe('Payload', () => {

  describe('constructor()', () => {
    it('should accept no constructor arguments', () => {
      let payload = new Payload()
      assert.isNotNull(payload)
    })

    it('should accept payload as a constructor argument', () => {
      let payload = new Payload({ testing: true })
      assert.isTrue(payload.testing)
    })
  })

  describe('match()', () => {
    let payload = new Payload({ text: 'testing 1234' })

    it('should not find unmatch regex', () => {
      let match = payload.match(/unfound/i)
      assert.isNull(match)
    })

    it('should find match regex', () => {
      let match = payload.match(/test/i)
      assert.isNotNull(match)
    })
  })

})