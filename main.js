const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;

function getThisWeeksTuesday() {
    const thisWeeksTuesday = new Date(Date.now());
    const today = thisWeeksTuesday.getDate();
    const dayOfTheWeek = thisWeeksTuesday.getDay();
    thisWeeksTuesday.setDate(today - dayOfTheWeek + TUESDAY_TIME_DIFF);
    thisWeeksTuesday.setHours(18, 0, 0, 0);

    if (new Date() < thisWeeksTuesday) {
        return new Date(thisWeeksTuesday);
    }
    const nextWeeksTraining = new Date(thisWeeksTuesday);
    return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7))
}

function getThisWeeksThursday() {
    const thisWeeksTuesday = new Date(Date.now());
    const today = thisWeeksTuesday.getDate();
    const dayOfTheWeek = thisWeeksTuesday.getDay();
    thisWeeksTuesday.setDate(today - dayOfTheWeek + THURSDAY_TIME_DIFF);
    thisWeeksTuesday.setHours(18, 0, 0, 0);

    if (new Date() < thisWeeksTuesday) {
        return new Date(thisWeeksTuesday);
    }
    const nextWeeksTraining = new Date(thisWeeksTuesday);
    return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7))
}

function getTrainingDateAsGermanDateFormat(trainingDate) {
    return trainingDate.getUTCDate() + '.' + (trainingDate.getMonth() + 1) + '.' + trainingDate.getFullYear();
}

function trainingDayForChannelId(channelId) {
    if (channelId == "C012C7UEX9C") {
        return "Dienstag"
    }

    if (channelId == "C012K00AJFL") {
        return "Donnerstag"
    }
}

function getUpcomingTrainingWeekDayDate(trainingDay) {
    let trainingDate;
    if (trainingDay === 'Dienstag') {
        trainingDate = getThisWeeksTuesday();
    } else if (trainingDay === 'Donnerstag') {
        trainingDate = getThisWeeksThursday();
    }

    return getTrainingDateAsGermanDateFormat(trainingDate)
}

function saveNewTrainingAttendeeToSpreadSheet(fullTrainingWeekDayName, upcomingTrainingWeekDayDate, spreadsheetApp, userName, channelName) {
    const spreadsheetName = fullTrainingWeekDayName + ' ' + upcomingTrainingWeekDayDate;
    const spreadsheet = spreadsheetApp.getSheetByName(fullTrainingWeekDayName);
    spreadsheet.appendRow([userName, channelName, Date.now()]);
    return spreadsheetName
}

function doPost(e) {
    if (typeof e === 'undefined') {
        return;
    }

    const spreadsheetApp = SpreadsheetApp.getActiveSpreadsheet();

    const userName = e.parameter.user_name;
    const channelName = e.parameter.channel_name;
    const channelId = e.parameter.channel_id;

    let fullTrainingWeekDayName = trainingDayForChannelId(channelId);
    let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(fullTrainingWeekDayName);

    let spokenTrainingDate = saveNewTrainingAttendeeToSpreadSheet(fullTrainingWeekDayName, upcomingTrainingWeekDayDate, spreadsheetApp, userName, channelName);

    let textOutput = 'Du bist beim Training am ' + spokenTrainingDate + ' dabei :confetti_ball:'
    return ContentService.createTextOutput(textOutput);
}

exports._test = {
    doPost: doPost
}
