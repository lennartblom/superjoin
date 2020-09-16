function doPost(e) {
    if (typeof e !== 'undefined') {
        var spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

        /* todo
           var sheetName = deriveSheetNameFromChannelId(e.parameter.channel_id) // should return something like "Montag dd.mm.YYYY"

           var spreadsheet = findOrCreateSheet(sheetName);

           writeParticipantToSheet()

           getListOfCurrentParticipants()

           return the number of participants and a slash command that allows the channel user to fetch the current participants list
        */
        var spreadsheet = spreadsheetApp.getSheetByName('Montag');

        var userName = e.parameter.user_name;
        var channelName = e.parameter.channel_name;

        spreadsheet.appendRow([userName, channelName, Date.now()]);

        return ContentService.createTextOutput('Du bist dabei :confetti_ball:');
    }
}