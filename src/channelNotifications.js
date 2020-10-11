const {TUESDAY_CHANNEL_ID, THURSDAY_CHANNEL_ID, SATURDAY_CHANNEL_ID} = require("./crossDomain");
const {TUESDAY_WEBHOOK_URL,
  THURSDAY_WEBHOOK_URL,
  SATURDAY_WEBHOOK_URL,
  TEST_WEBHOOK_URL} = require("./secrets")

const TUESDAY_CHANNEL_URL = "https://hooks.slack.com/services/asdasdas/asdasdasd/TUESDAY";
const THURSDAY_CHANNEL_URL = "https://hooks.slack.com/services/asdasdas/asdasdasd/THURSDAY";
const SATURDAY_CHANNEL_URL = "https://hooks.slack.com/services/asdasdas/asdasdasd/SATURDAY";

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
      return TUESDAY_CHANNEL_URL;
    }
    case THURSDAY_CHANNEL_ID: {
      return THURSDAY_CHANNEL_URL;
    }
    case SATURDAY_CHANNEL_ID: {
      return SATURDAY_CHANNEL_URL;
    }
    default: {
      return null;
    }
  }
}

module.exports = notifyChannelAboutNewParticipant;

exports._test = {
  notifyChannelAboutNewParticipant: notifyChannelAboutNewParticipant,
}