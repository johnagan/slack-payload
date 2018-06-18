class Payload {

  /**
   * The payload constructor
   *
   * @param {Object} payload - the slack payload
   */
  constructor(payload) {
    payload = payload || {}

    // JSON String
    if (typeof payload === 'string')
      payload = JSON.parse(payload)

    // Interactive Messages
    if (payload.payload)
      payload = JSON.parse(payload.payload)

    Object.assign(this, payload)
  }


  /**
   * Get an interactive message's selected action
   *
   * @return {Object} the action
   */
  get action() {
    if (this.actions) return this.actions[0]
  }


  /**
   * Get a message's selected option
   *
   * @return {Object} the selected option
   */
  get selection() {
    if (this.action && this.action.selected_options)
      return this.action.selected_options[0]
  }


  /**
   * Match the message text against a regex
   *
   * @param {RegExp} regex - the regex to test
   * @return {Array} the regex match
   */
  match(regex) {
    if (typeof regex !== "object") regex = new RegExp(regex, "im")
    if (this.text) return this.text.match(regex)
  }


  /**
   * Check if the payload is a type of event
   *
   * @param {String} type - the event type to check
   * @return {Boolean} does the payload match the type 
   */
  is(type) {
    return this.types.includes(type) || this.match(type)
  }


  /**
   * Get the message text
   *
   * @return {String} the message text
   */
  get text() {
    // Slash Commands
    if (super.text) return super.text

    // Events API
    if (this.event && this.event.text) return this.event.text
  }


  /**
   * Set the text
   *
   * @param {String} text - the text
   */
  set text(text) {
    super.text = text
  }


  /**
   * Get the bot id the payload was sent from (if applicable)
   *
   * @return {String} the bot id
   */
  get bot_id() {
    return super.bot_id || (this.event && this.event.bot_id)
  }


  /**
   * Set the bot id
   *
   * @param {String} bot_id - the bot id
   */
  set bot_id(bot_id) {
    super.bot_id = bot_id
  }


  /**
   * Get the channel id the payload was sent from
   *
   * @return {String} the channel id
   */
  get channel_id() {
    // Interactive Messages
    if (this.channel) return this.channel.id

    // Slash Commands
    if (super.channel_id) return super.channel_id

    // Events API
    let event = this.event
    if (event && event.channel) return event.channel
    if (event && event.item) return event.item.channel
  }


  /**
   * Set the channel id
   *
   * @param {String} channel_id - the channel id
   */
  set channel_id(channel_id) {
    super.channel_id = channel_id
  }


  /**
   * Get the team id the payload was sent from
   *
   * @return {String} the team id
   */
  get team_id() {
    // Interactive Messages
    if (this.team) return this.team.id

    // Slash Commands
    if (super.team_id) return super.team_id

    // Events API
    let event = this.event
    if (event && event.team) return event.team
    if (event && event.item) return event.item.team
  }


  /**
   * Set the team id
   *
   * @param {String} team_id - the team id
   */
  set team_id(team_id) {
    super.team_id = team_id
  }


  /**
   * Get the user id that sent the payload
   *
   * @return {String} the user id
   */
  get user_id() {
    // Interactive Messages
    if (this.user) return this.user.id

    // Slash Commands
    if (super.user_id) return super.user_id

    // Events API
    let event = this.event
    if (event && event.user) return event.user
    if (event && event.item) return event.item.user
  }


  /**
   * Set the user id
   *
   * @param {String} user_id - the user id
   */
  set user_id(user_id) {
    super.user_id = user_id
  }


  /**
   * Get event types that triggered this payload
   *
   * @return {Array} the event types
   */
  get types() {
    let events = []

    // incoming message by type
    if (this.type) events.push(this.type)

    // message came from a bot
    if (this.bot_id) events.push('bot_message')

    // event triggered by event type
    if (this.event) events.push('event', this.event.type)

    // url challenge request
    if (this.challenge) events.push('challenge', this.challenge)

    // slash command by command
    if (this.command) events.push('slash_command', this.command)

    // webhook triggered by trigger word
    if (this.trigger_word) events.push('webhook', this.trigger_word)

    // interactive message triggered by callback_id
    if (this.callback_id) events.push('interactive_message', this.callback_id)

    // message selection
    if (this.selection) events.push('message_select', this.selection.value)

    // message button triggered by callback_id
    if (this.action) events.push('message_button', this.action.value)
    
    // ensure unique values
    events = events.filter((v, i, a) => a.indexOf(v) === i); 

    return events
  }
}

module.exports = Payload
