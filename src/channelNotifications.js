const {} = require("./crossDomain");
const {
  MONDAY_CHANNEL_ID, TUESDAY_CHANNEL_ID, THURSDAY_CHANNEL_ID, SATURDAY_CHANNEL_ID, SUNDAY_CHANNEL_ID
} = require("./crossDomain");
const {
  MONDAY_WEBHOOK_URL, TUESDAY_WEBHOOK_URL, THURSDAY_WEBHOOK_URL, SATURDAY_WEBHOOK_URL, SUNDAY_WEBHOOK_URL
} = require("./secrets")

function notifyAboutParticipant(e) {
  if (typeof e === "undefined") {
    return;
  }

  const channelId = e.parameter.channel_id;
  const userName = e.parameter.user_name;

  notifyChannelAboutNewParticipant(channelId, userName);
}

function notifyChannelAboutNewParticipant(channelId, participant) {
  const channelWebHookUrl = getChannelWebhook(channelId);

  if (channelWebHookUrl == null) {
    return 404;
  }
  let requestOptions = {
    'method': 'post',
    'headers': {
      'Content-type': 'application/json'
    },
    'payload': JSON.stringify({
      'text': ":heavy_plus_sign: `" + participant + "` hat sich zum nächsten Training angemeldet!"
    })
  };
  UrlFetchApp.fetch(channelWebHookUrl, requestOptions);

  return 200;
}

function getChannelWebhook(channelId) {
  switch (channelId) {
    case MONDAY_CHANNEL_ID: {
      return MONDAY_WEBHOOK_URL;
    }
    case TUESDAY_CHANNEL_ID: {
      return TUESDAY_WEBHOOK_URL;
    }
    case THURSDAY_CHANNEL_ID: {
      return THURSDAY_WEBHOOK_URL;
    }
    case SATURDAY_CHANNEL_ID: {
      return SATURDAY_WEBHOOK_URL;
    }
    case SUNDAY_CHANNEL_ID: {
      return SUNDAY_WEBHOOK_URL;
    }
    default: {
      return null;
    }
  }
}

module.exports = {
  notifyChannelAboutNewParticipant: notifyChannelAboutNewParticipant,
  notifyAboutParticipant: notifyAboutParticipant,
};

exports._test = {
  notifyChannelAboutNewParticipant: notifyChannelAboutNewParticipant,
}
