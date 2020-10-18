const { getSpreadsheetName } = require("./crossDomain");

function listParticipants(e) {
  if (typeof e === "undefined") {
    return;
  }
  const channelId = e.parameter.channel_id;
  const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

  let spreadsheetName = getSpreadsheetName(channelId);

  let trainingSpreadSheet = spreadsheetApp.getSheetByName(spreadsheetName);

  let participantsOutput = initializeWithTrainingHeadline(spreadsheetName);

  let participants = readParticipantsFromSpreadsheet(trainingSpreadSheet);

  return printOutParticipants(participants, participantsOutput);
}

function readParticipantsFromSpreadsheet(trainingSpreadSheet) {
  if (trainingSpreadSheet == null) {
    return [];
  }

  const participantsRows = trainingSpreadSheet.getDataRange().getValues();
  let participants = [];
  let skipFirstRow = true;
  participantsRows.forEach(function (row) {
    if (skipFirstRow) {
      skipFirstRow = false;
      return;
    }

    addParticipant(row, participants);
  });
  return participants;
}

function printOutParticipants(participants, participantsOutput) {
  if (participants.length > 0) {
    participantsOutput = addParticipantsToOutput(
      participants,
      participantsOutput
    );
  } else {
    participantsOutput +=
      "Bislang hat sich noch niemand angemeldet, also starte durch mit `/dabei`! :rocket:";
  }
  return participantsOutput;
}

function addParticipant(row, participants) {
  const participant = row[0];
  participants.push(participant);
}

function addParticipantsToOutput(participants, participantsOutput) {
  participantsOutput = addEndingCodeSection(participantsOutput, true);

  participants.forEach(function (participant) {
    const participantEntry = "• " + participant;
    participantsOutput = participantsOutput + participantEntry + "\n";
  });

  participantsOutput = addEndingCodeSection(participantsOutput, false);

  return participantsOutput;
}

function addEndingCodeSection(participantsOutput, endingLinebreak) {
  if (endingLinebreak) {
    return participantsOutput + "```\n";
  } else {
    return participantsOutput + "```";
  }
}

function initializeWithTrainingHeadline(spreadsheetName) {
  return (
    "\n:eilbeck: *Trainingsteilnehmer am `" +
    spreadsheetName +
    "`* :page_with_curl:\n"
  );
}

module.exports = {
  listParticipants: listParticipants,
};

exports._test = {
  listParticipants: listParticipants,
};
