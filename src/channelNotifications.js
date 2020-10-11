const {TUESDAY_CHANNEL_ID, THURSDAY_CHANNEL_ID, SATURDAY_CHANNEL_ID} = require("./crossDomain");
const {TUESDAY_WEBHOOK_URL, THURSDAY_WEBHOOK_URL, SATURDAY_WEBHOOK_URL} = require("./secrets")

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
    method: 'post',
    payload: {
      text: '' + participant + " hat sich zum nächsten Training angemeldet! :heavy_plus_sign:"
    }
  };
  UrlFetchApp.fetch(channelWebHookUrl, requestOptions);

  return 200;
}

function getChannelWebhook(channelId) {
  switch (channelId) {
    case TUESDAY_CHANNEL_ID: {
      return TUESDAY_WEBHOOK_URL;
    }
    case THURSDAY_CHANNEL_ID: {
      return THURSDAY_WEBHOOK_URL;
    }
    case SATURDAY_CHANNEL_ID: {
      return SATURDAY_WEBHOOK_URL;
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