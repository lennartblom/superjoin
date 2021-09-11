const participate = require("./participate");
const listParticipants = require("./listParticipants");
const { signOut } = require("./signOut");
const {
  notifyAboutParticipant,
  notifyAboutGuest,
} = require("./channelNotifications");

const PARTICIPATE_COMMAND = "/dabei";
const LIST_PARTICIPANTS_COMMAND = "/teilnehmer";
const SIGN_OUT_COMMAND = "/austragen";
const ADD_GUEST = "/gast";

function respondEphemeral(textOutput, responseUrl) {
  let requestOptions = {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    payload: JSON.stringify({
      text: textOutput,
      response_type: "ephemeral"
    })
  };
  UrlFetchApp.fetch(responseUrl, requestOptions);
}

function asyncParticipate(e) {
  Logger.log("Starting asyncParticipate");

  const triggerUid = e && e.triggerUid;
  const cache = CacheService.getScriptCache().get(triggerUid);
  const data = JSON.parse(cache);
  let responseUrl = data.parameter.responseUrl;

  if (typeof data === "undefined") {
    return;
  }

  const result = participate(data);
  textOutput = result[0] + listParticipants(data);
  if (result[1]) {
    notifyAboutParticipant(data);
  }

  respondEphemeral(textOutput, responseUrl);

  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getUniqueId() === triggerUid) {
      ScriptApp.deleteTrigger(t);
    }
  });
}


function triggerAsyncParticipate(slackRequestData) {
  const trigger = ScriptApp.newTrigger("asyncParticipate")
    .timeBased()
    .after(5)
    .create();

  Logger.log("TriggerAsyncParticipate stuff");
  Logger.log(trigger.getUniqueId());
  CacheService.getScriptCache().put(String(trigger.getUniqueId()), JSON.stringify(slackRequestData));
}

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  let command = e.parameter.command;
  Logger.log(command);

  switch (command) {
    case PARTICIPATE_COMMAND: {
      triggerAsyncParticipate(e);
      textOutput = "Trainingsanmeldung eingegangen :white_check_mark:";
      break;
    }
    case LIST_PARTICIPANTS_COMMAND: {
      textOutput = listParticipants(e);
      break;
    }
    case SIGN_OUT_COMMAND: {
      const result = signOut(e);
      textOutput = result[0] + listParticipants(e);
      break;
    }
    case ADD_GUEST: {
      const result = addGuest(e);
      textOutput = result[0] + listParticipants(e);
      if (result[1]) {
        notifyAboutGuest(e);
      }
      break;
    }
  }

  return ContentService.createTextOutput(textOutput);
}

exports._test = {
  doPost: doPost,
};
