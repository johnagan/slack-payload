const assert = require('chai').assert,
  Payload = require('../index')

describe('Events', () => {
  let fixtures = require('./fixtures')

  Object.keys(fixtures).forEach(type => {
    describe(type, () => {
      let data = fixtures[type]
      let payload = new Payload(data)

      it('should parse the payload', () => {
        assert.equal(payload.token, data.token)
      })

      it('should match on a text lookup', () => {
        let match = payload.match(/text/i)
        assert.isNotNull(match)
      })

      it('should get a user id', () => {
        let user_id = payload.user_id
        assert.isNotNull(user_id)
      })

      it('should get a team id', () => {
        let team_id = payload.team_id
        assert.isNotNull(team_id)
      })

      it('should get a channel id', () => {
        let channel_id = payload.channel_id
        assert.isNotNull(channel_id)
      })
    })
  })
})