# superjoin

## /dabei

Run the /dabei command in one of the configured channels (training-dienstag, training-donnerstag, training-samstag) and put yourself on the participants list.

[Google Sheet](https://docs.google.com/spreadsheets/d/1DaWmSCXBWlh8RdJsn8WMOCnJlxJj6rucwDRYiLMHutg/edit#gid=0)


## The slack message structure

example payload of a command post message

```
{
  "parameters":{
    "user_name":["nickname.of.the.user"],
    "user_id":["USER_IC"],
    "text":[""],
    "command":["/dabei"],
    "channel_id":["CHANNEL_ID"],
    "api_app_id":["APP_ID"],
    "team_domain":["eilbeck"],
    "team_id":["TEAM_ID"],
    "response_url":["https://hooks.slack.com/commands/TEAM_ID/ID/SLUG"],
    "channel_name":["directmessage"],
    "trigger_id":["TRIGGER_ID"],
    "token":["TOKEN"]
  },
  "contextPath":"",
  "queryString":"",
  "postData":{
    "contents":"a content string with all the ids and tokens",
    "length":394,
    "name":"postData",
    "type":"application/x-www-form-urlencoded"
  },
  "parameter":{
    "response_url":"https://hooks.slack.com/commands/TEAM_ID/ID/SLUG",
    "user_id":"USER_ID",
    "channel_id":"CHANNEL_ID",
    "user_name":"user.name",
    "command":"/dabei",
    "text":"",
    "api_app_id":"APP_ID",
    "token":"TOKEN",
    "team_domain":"eilbeck",
    "team_id":"TEAM_ID",
    "channel_name":"directmessage",
    "trigger_id":"TRIGGER_ID"
  },
  "contentLength":394
}
```