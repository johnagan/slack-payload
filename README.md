# Slack Payload Wrapper

A lightweight wrapper for Slack payloads to make working with events easier and consistent across schemas.

## Why?

Slack has many events that POST to HTTPS endpoints, including [Slash Commands](https://api.slack.com/slash-commands), [Events API](https://api.slack.com/events-api), and [Interactive Messages](https://api.slack.com/docs/message-buttons). Each payload schema is slightly different and adds additional if/then logic to your endpoint functions.

Let's use `user_id` as an example. If your endpoint needs this id, your logic might look something like this:

```js
function getUserId(payload) {
  // Interactive Messages
  if (payload.user) return payload.user.id

  // Slash Commands
  if (payload.user_id) return payload.user_id

  // Events API
  if (payload.event && payload.event.user) return payload.event.user
  if (payload.event && payload.event.item) return payload.event.item.user
}
```

Sometimes even the payload itself requires work to use since it can be encoded then included in the `payload` field.
```js
if (event.payload)
  payload = JSON.parse(event.payload)
```

## Example
```js
const Payload = require('slack-payload'),

app.post('/slack', (req, res) => {
  let payload = new Payload(req.body)

  // returns the message text no matter the event type
  let text = payload.text

  // check for the event type or values
  let isCommand = payload.is('slash_command')
  let isButtonClick = payload.is('message_button')
  let isButtonValue = payload.is('my_button_value')

  // perform regex on text messages
  let match = payload.match(/lunch/i)

  // determine if the event was caused by a bot
  let bot_id = payload.bot_id

})
```

## API

Property | Description
---|---
`text` | The message text associated with the event
`team_id` | The team id the payload was sent from
`channel_id` | The channel id the payload was sent from
`user_id` | The user id that sent the payload (if available)
`bot_id` | The bot id that sent the payload (if available)
`selection` | The selected interactive message option
`action` | The selected interactive message action
`types` | An array of all types associated with this payload (includes a wildcard)

Function | Parameter | Description
---|---|---
`is` | event type [String] | Checks if the payload matches an event type. Get a full list of events [here](index.js#L197)
`match` | regex | Matches the text with a regular expression

## Install
```
npm i slack-payload
```
