const assert = require("assert");
const participate = require("../src/participate");

global.ContentService = {
  createTextOutput: (variable) => variable,
};

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

    const e = {
      parameter: {
        user_name: "wolfgang",
        user_id: "a_user_ID",
        command: "/dabei",
        channel_id: "C01BXQKR9KM",
        channel_name: "training-samstag",
      },
    };

    let thisWeeksSaturday = getThisWeeksDay(false, 1);
    let nextWeeksSaturday = getThisWeeksDay(true, 1);
    let returnValue = participate(e);

    if (thisWeeksSaturday < Date.now()) {
      console.log("Expect next weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, "Montag")
      );
    } else {
      console.log("Expect this weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, "Montag")
      );
    }
    assert.strictEqual(returnValue[1], true);
  });
  it("should return Tuesday when being in #training-dienstag channel", function () {
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
        channel_id: "C012C7UEX9C",
        channel_name: "training-dienstag",
      },
    };

    let thisWeeksTuesday = getThisWeeksDay(false, 2);
    let nextWeeksTuesday = getThisWeeksDay(true, 2);
    let returnValue = participate(requestData);

    if (thisWeeksTuesday < Date.now()) {
      console.log("Expect next weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, "Dienstag")
      );
    } else {
      console.log("Expect this weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksTuesday, "Dienstag")
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
        channel_id: "C012K00AJFL",
        channel_name: "training-donnerstag",
      },
    };

    let thisWeeksThursday = getThisWeeksDay(false, 4);
    let nextWeeksThursday = getThisWeeksDay(true, 4);
    let returnValue = participate(e);

    if (thisWeeksThursday < Date.now()) {
      console.log("Expect next weeks Thursday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksThursday, "Donnerstag")
      );
    } else {
      console.log("Expect this weeks Tuesday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksThursday, "Donnerstag")
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
        channel_id: "C012C7UQPSS",
        channel_name: "training-samstag",
      },
    };

    let thisWeeksSaturday = getThisWeeksDay(false, 6);
    let nextWeeksSaturday = getThisWeeksDay(true, 6);
    let returnValue = participate(e);

    if (thisWeeksSaturday < Date.now()) {
      console.log("Expect next weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, "Samstag")
      );
    } else {
      console.log("Expect this weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, "Samstag")
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
        channel_id: "C01D7L86K8Q",
        channel_name: "training-samstag",
      },
    };

    let thisWeeksSaturday = getThisWeeksDay(false, 7);
    let nextWeeksSaturday = getThisWeeksDay(true, 7);
    let returnValue = participate(e);

    if (thisWeeksSaturday < Date.now()) {
      console.log("Expect next weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, "Sonntag")
      );
    } else {
      console.log("Expect this weeks Saturday");
      assert.strictEqual(
        returnValue[0],
        createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, "Sonntag")
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
        channel_id: "C012C7UEX9C",
        channel_name: "training-dienstag",
      },
    };

    let thisWeeksTuesday = getThisWeeksDay(false, 2);
    let nextWeeksTuesday = getThisWeeksDay(true, 2);
    let returnValue = participate(requestData);

    if (thisWeeksTuesday < Date.now()) {
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
  let newDate = new Date(date.setDate(today - dayOfTheWeek + dayConstant));

  if (!plusOneWeek) {
    return newDate;
  }

  const nextWeeksTraining = new Date(newDate);
  return new Date(nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7));
}

function createdExpectedOutputForAlreadyParticipating(nextWeeksTuesday, day) {
  return (
    "Du bist schon beim Training " +
    day +
    " " +
    getDateInGermanFormat(nextWeeksTuesday) +
    " dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: "
  );
}

function createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, day) {
  return (
    "Du bist beim Training am " +
    day +
    " " +
    getDateInGermanFormat(nextWeeksTuesday) +
    " dabei :confetti_ball:"
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
