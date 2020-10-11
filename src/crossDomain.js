const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;
const TUESDAY_CHANNEL_ID = "C012C7UEX9C";
const THURSDAY_CHANNEL_ID = "C012K00AJFL";
const SATURDAY_CHANNEL_ID = "C012C7UQPSS";

function getSpreadsheetName(channelId) {
    let fullTrainingWeekDayName = trainingDayForChannelId(channelId);
    let upcomingTrainingWeekDayDate = getUpcomingTrainingWeekDayDate(
        fullTrainingWeekDayName
    );

    return fullTrainingWeekDayName + " " + upcomingTrainingWeekDayDate;
}

function getUpcomingTrainingWeekDayDate(trainingDay) {
    let trainingDate;
    if (trainingDay === "Dienstag") {
        trainingDate = getThisWeeksTuesday();
    } else if (trainingDay === "Donnerstag") {
        trainingDate = getThisWeeksThursday();
    } else if (trainingDay === "Samstag") {
        trainingDate = getThisWeeksSaturday();
    }

    return getTrainingDateAsGermanDateFormat(trainingDate);
}

function getTrainingDateAsGermanDateFormat(trainingDate) {
    return (
        trainingDate.getUTCDate() +
        "." +
        (trainingDate.getMonth() + 1) +
        "." +
        trainingDate.getFullYear()
    );
}

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
    return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
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
    return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function getThisWeeksSaturday() {
    const thisWeeksSaturday = new Date(Date.now());
    const today = thisWeeksSaturday.getDate();
    const dayOfTheWeek = thisWeeksSaturday.getDay();
    thisWeeksSaturday.setDate(today - dayOfTheWeek + SATURDAY_TIME_DIFF);
    thisWeeksSaturday.setHours(10, 0, 0, 0);

    if (new Date() < thisWeeksSaturday) {
        return new Date(thisWeeksSaturday);
    }
    const nextWeeksTraining = new Date(thisWeeksSaturday);
    return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function trainingDayForChannelId(channelId) {
    if (channelId === TUESDAY_CHANNEL_ID) {
        return "Dienstag";
    }

    if (channelId === THURSDAY_CHANNEL_ID) {
        return "Donnerstag";
    }

    if (channelId === SATURDAY_CHANNEL_ID) {
        return "Samstag";
    }
}

exports.getSpreadsheetName = getSpreadsheetName;
exports.TUESDAY_CHANNEL_ID = TUESDAY_CHANNEL_ID;
exports.THURSDAY_CHANNEL_ID = THURSDAY_CHANNEL_ID;
exports.SATURDAY_CHANNEL_ID = SATURDAY_CHANNEL_ID;
