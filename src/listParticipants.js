const getSpreadsheetName = require("./crossDomain");

function listParticipants(e) {
    if (typeof e === "undefined") {
        return;
    }
    const channelId = e.parameter.channel_id;
    const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

    let spreadsheetName = getSpreadsheetName(channelId);

    let trainingSpreadSheet = spreadsheetApp.getSheetByName(spreadsheetName);

    const participantsRows = trainingSpreadSheet.getDataRange().getValues();

    let participantsOutput = initializeWithTrainingHeadline(spreadsheetName);
    participantsOutput = addStartingCodeSection(participantsOutput);
    let skipFirstRow = true;
    participantsRows.forEach(function(row) {
        if (skipFirstRow) {
            skipFirstRow = false;
            return;
        }

        participantsOutput = addParticipantLine(row, participantsOutput);
    });

    participantsOutput = addEndingCodeSection(participantsOutput);
    return participantsOutput;
}
function initializeWithTrainingHeadline(spreadsheetName) {
    return "\n:eilbeck: *Trainingsteilnehmer am `" + spreadsheetName + "`* :page_with_curl:\n";
}

function addStartingCodeSection(participantsOutput) {
    return participantsOutput + "```\n";
}

function addParticipantLine(row, participantsOutput) {
    const participantEntry = "• " + row[0];
    participantsOutput = participantsOutput + participantEntry + "\n";
    return participantsOutput;
}

function addEndingCodeSection(participantsOutput) {
    return participantsOutput + "```";
}

module.exports = listParticipants;

exports._test = {
    listParticipants: listParticipants,
};
