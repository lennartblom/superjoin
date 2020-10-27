const {getUserName} = require("./getUserName");
const {} = require("./crossDomain");
const {
  MONDAY_CHANNEL_ID,
  TUESDAY_CHANNEL_ID,
  THURSDAY_CHANNEL_ID,
  SATURDAY_CHANNEL_ID,
  SUNDAY_CHANNEL_ID,
} = require("./crossDomain");
const {
  MONDAY_WEBHOOK_URL,
  TUESDAY_WEBHOOK_URL,
  THURSDAY_WEBHOOK_URL,
  SATURDAY_WEBHOOK_URL,
  SUNDAY_WEBHOOK_URL,
} = require("./secrets");

function notifyAboutParticipant(e) {
  if (typeof e === "undefined") {
    return;
  }

  const channelId = e.parameter.channel_id;
  const userName = getUserName(e.parameter.user_name, e.parameter.user_id);

  notifyChannelAboutNewParticipant(channelId, userName, false);
}

function notifyAboutGuest(e) {
  if (typeof e === "undefined") {
    return;
  }

  const channelId = e.parameter.channel_id;
  const userName = getUserName(e.parameter.user_name, e.parameter.user_id);
  const guestName = e.text;

  notifyChannelAboutNewParticipant(channelId, userName, guestName);
}

function guestNotificationPayload(nickname, guestName) {
  return JSON.stringify({
    text:
        ":heavy_plus_sign: `" +
        nickname +
        "` hat `" + guestName + "` zum nächsten Training angemeldet!",
  })
}

function participantNotificationMessage(participant) {
  return JSON.stringify({
    text:
      ":heavy_plus_sign: `" +
      participant +
      "` hat sich zum nächsten Training angemeldet!",
  })
}

function notifyChannelAboutNewParticipant(channelId, userName, guestName) {
  const channelWebHookUrl = getChannelWebhook(channelId);

  if (channelWebHookUrl == null) {
    return 404;
  }
  let requestOptions = {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    payload: guestName ? guestNotificationPayload(userName, guestName) : participantNotificationMessage(userName)
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
  notifyAboutGuest: notifyAboutGuest,
};

exports._test = {
  notifyChannelAboutNewParticipant: notifyChannelAboutNewParticipant,
};
