const assert = require("assert");
const participate = require("../src/participate");

const MONDAY_TIME_DIFF = 1;
const TUESDAY_TIME_DIFF = 2;
const THURSDAY_TIME_DIFF = 4;
const SATURDAY_TIME_DIFF = 6;
const SUNDAY_TIME_DIFF = 7;

const MONDAY_STABILITY_CHANNEL_ID = "C01FGDKUNLC";
const MONDAY_CHANNEL_ID = "C01BXQKR9KM";
const TUESDAY_CHANNEL_ID = "C012C7UEX9C";
const THURSDAY_CHANNEL_ID = "C012K00AJFL";
const SATURDAY_CHANNEL_ID = "C012C7UQPSS";
const SUNDAY_CHANNEL_ID = "C01D7L86K8Q";

const MONDAY_STABILITY_TRAINING_NAME = "Montag Stabi";
const MONDAY_TRAINING_NAME = "Montag";
const TUESDAY_TRAINING_NAME = "Dienstag";
const THURSDAY_TRAINING_NAME = "Donnerstag";
const SATURDAY_TRAINING_NAME = "Samstag";
const SUNDAY_TRAINING_NAME = "Sonntag";

global.ContentService = {
  createTextOutput: (variable) => variable,
};

function getTodaysDate(hours) {
  return new Date(new Date(Date.now()).setHours(hours));
}

describe("`/dabei` command", function () {
  it("should return Monday when being in #training-montag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };
    const mockResponse = {
      getContentText: function () {
        return JSON.stringify({ ok: true, user: { real_name: "Test User" } });
      },
    };
    global.UrlFetchApp = {
      fetch: function (url) {
        assert.strictEqual(
          url,
          `https://slack.com/api/users.info?token=xoxb-test&user=a_user_ID`
        );

        return mockResponse;
      },
    };

    const e = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: MONDAY_CHANNEL_ID,
        channel_name: "training-samstag",
      },
    };

    let thisWeeksMonday = getThisWeeksDay(false, MONDAY_TIME_DIFF);
    let nextWeeksMonday = getThisWeeksDay(true, MONDAY_TIME_DIFF);
    let returnValue = participate(e);

    if (thisWeeksMonday <= getTodaysDate(19)) {
      console.log("Expect next weeks Monday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksMonday, "Montag")
      );
    } else {
      console.log("Expect this weeks Monday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksMonday, "Montag")
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should return Monday when being in #stabitraining-montag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };

    const e = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: MONDAY_STABILITY_CHANNEL_ID,
        channel_name: "stabitraining-montag",
      },
    };

    let thisWeeksMonday = getThisWeeksDay(false, MONDAY_TIME_DIFF);
    let nextWeeksMonday = getThisWeeksDay(true, MONDAY_TIME_DIFF);
    let returnValue = participate(e);

    if (thisWeeksMonday <= getTodaysDate(19)) {
      console.log("Expect next weeks Monday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksMonday, MONDAY_STABILITY_TRAINING_NAME)
      );
    } else {
      console.log("Expect this weeks Monday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksMonday, MONDAY_STABILITY_TRAINING_NAME)
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should return Tuesday when being in #training-montag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };
    const requestData = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: TUESDAY_CHANNEL_ID,
        channel_name: "training-dienstag",
      },
    };

    let thisWeeksTuesday = getThisWeeksDay(false, TUESDAY_TIME_DIFF);
    let nextWeeksTuesday = getThisWeeksDay(true, TUESDAY_TIME_DIFF);
    let returnValue = participate(requestData);

    if (thisWeeksTuesday <= getTodaysDate(18)) {
      console.log("Expect next weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, TUESDAY_TRAINING_NAME)
      );
    } else {
      console.log("Expect this weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksTuesday, TUESDAY_TRAINING_NAME)
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should return Thursday when being in #training-donnerstag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };

    const e = {
      parameter: {
        user_name: "Wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: THURSDAY_CHANNEL_ID,
        channel_name: "training-donnerstag",
      },
    };

    let thisWeeksThursday = getThisWeeksDay(false, THURSDAY_TIME_DIFF);
    let nextWeeksThursday = getThisWeeksDay(true, THURSDAY_TIME_DIFF);
    let returnValue = participate(e);

    if (thisWeeksThursday <= getTodaysDate(18)) {
      console.log("Expect next weeks Thursday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksThursday, THURSDAY_TRAINING_NAME)
      );
    } else {
      console.log("Expect this weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksThursday, THURSDAY_TRAINING_NAME)
      );
    }
    assert.strictEqual(returnValue[1], true);
  });

  it("should return Saturday when being in #training-samstag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };

    const e = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: SATURDAY_CHANNEL_ID,
        channel_name: "training-samstag",
      },
    };

    let thisWeeksSaturday = getThisWeeksDay(false, SATURDAY_TIME_DIFF);
    let nextWeeksSaturday = getThisWeeksDay(true, SATURDAY_TIME_DIFF);
    let returnValue = participate(e);

    if (thisWeeksSaturday <= getTodaysDate(18)) {
      console.log("Expect next weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, SATURDAY_TRAINING_NAME)
      );
    } else {
      console.log("Expect this weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, SATURDAY_TRAINING_NAME)
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should return Sunday when being in #training-sonntag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "max_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };

    const e = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: SUNDAY_CHANNEL_ID,
        channel_name: "training-samstag",
      },
    };

    let thisWeeksSaturday = getThisWeeksDay(false, SUNDAY_TIME_DIFF);
    let nextWeeksSaturday = getThisWeeksDay(true, SUNDAY_TIME_DIFF);
    let returnValue = participate(e);

    if (thisWeeksSaturday <= getTodaysDate(18)) {
      console.log("Expect next weeks Sunday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, SUNDAY_TRAINING_NAME)
      );
    } else {
      console.log("Expect this weeks SATURDAY_CHANNEL_ID");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, SUNDAY_TRAINING_NAME)
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should say you're already participating on Tuesday's", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""],
              ["max mustermann", "a_user_ID", 1337],
              ["alina musterfrau", "alina_user_ID", 1337],
            ],
          }),
        }),
      }),
    };

    const requestData = {
      parameter: {
        user_name: "max mustermann",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: TUESDAY_CHANNEL_ID,
        channel_name: "training-dienstag",
      },
    };

    let thisWeeksTuesday = getThisWeeksDay(false, TUESDAY_TIME_DIFF);
    let nextWeeksTuesday = getThisWeeksDay(true, TUESDAY_TIME_DIFF);
    let returnValue = participate(requestData);

    if (thisWeeksTuesday <= getTodaysDate(18)) {
      console.log("Expect next weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createdExpectedOutputForAlreadyParticipating(
          nextWeeksTuesday,
          "Dienstag"
        )
      );
    } else {
      console.log("Expect this weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createdExpectedOutputForAlreadyParticipating(
          thisWeeksTuesday,
          "Dienstag"
        )
      );
    }
    assert.strictEqual(returnValue[1], false);
  });
});

function getThisWeeksDay(plusOneWeek, dayConstant) {
  const date = new Date(Date.now());
  const today = date.getDate();
  const dayOfTheWeek = date.getDay();
  if (dayConstant === MONDAY_TIME_DIFF) {
    date.setHours(19);
  } else {
    date.setHours(18);
  }
  let newDate = new Date(date.setDate(today - dayOfTheWeek + dayConstant));

  if (!plusOneWeek) {
    return newDate;
  }

  const nextWeeksTraining = new Date(newDate);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function createdExpectedOutputForAlreadyParticipating(nextWeeksTuesday, day) {
  return (
    "Du bist schon beim Training `" +
    day +
    " " +
    getDateInGermanFormat(nextWeeksTuesday) +
    "` dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: "
  );
}

function createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, day) {
  return (
    "Du bist beim Training `" + day + " " + getDateInGermanFormat(nextWeeksTuesday) + "` dabei! :confetti_ball:"
  );
}

function getDateInGermanFormat(newDate) {
  return (
    newDate.getUTCDate() +
    "." +
    (newDate.getMonth() + 1) +
    "." +
    newDate.getFullYear()
  );
}
