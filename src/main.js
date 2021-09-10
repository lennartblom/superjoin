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

function doPost(e) {
  if (typeof e === "undefined") {
    return;
  }

  let textOutput;

  let command = e.parameter.command;
  Logger.log(command);

  switch (command) {
    case PARTICIPATE_COMMAND: {
      const result = participate(e);
      textOutput = result[0];
      if (result[1]) {
        notifyAboutParticipant(e);
      }
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
