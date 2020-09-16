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

function getFullTrainingWeekDayName(channelName) {
    const channelPrefixLength = 'training-'.length;
    let trainingDay = channelName.slice(channelPrefixLength);
    trainingDay = trainingDay.charAt(0).toLocaleUpperCase() + trainingDay.slice(1);
    return trainingDay;
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

    let fullTrainingWeekDayName = getFullTrainingWeekDayName(channelName);
    let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(fullTrainingWeekDayName);

    let spokenTrainingDate = saveNewTrainingAttendeeToSpreadSheet(fullTrainingWeekDayName, upcomingTrainingWeekDayDate, spreadsheetApp, userName, channelName);

    let textOutput = 'Du bist beim Training am ' + spokenTrainingDate + ' dabei :confetti_ball:'
    return ContentService.createTextOutput(textOutput);
}

exports._test = {
    doPost: doPost
}
