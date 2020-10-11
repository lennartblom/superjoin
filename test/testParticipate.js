const assert = require("assert");
const participate = require("../src/participate");


global.ContentService = {
  createTextOutput: (variable) => variable,
};


describe("`/dabei` command", function () {

  it("should return Tuesday when being in #training-dienstag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""], ["max mustermann", 1337], ["alina musterfrau", 1337]
            ]
          }),
        }),
      }),
    };


    const requestData = {
      parameter: {
        user_name: "wolfgang",
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
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, "Dienstag"));
    } else {
      console.log("Expect this weeks Tuesday");
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(thisWeeksTuesday, "Dienstag"));
    }
  });

  it("should say you're already participating on Tuesday's", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""], ["max mustermann", 1337], ["alina musterfrau", 1337]
            ]
          }),
        }),
      }),
    };


    const requestData = {
      parameter: {
        user_name: "max mustermann",
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
      assert.equal(returnValue, createdExpectedOutputForAlreadyParticipating(nextWeeksTuesday, "Dienstag"));
    } else {
      console.log("Expect this weeks Tuesday");
      assert.equal(returnValue, createdExpectedOutputForAlreadyParticipating(thisWeeksTuesday, "Dienstag"));
    }
  })

  it("should return Thursday when being in #training-donnerstag channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""], ["max mustermann", 1337], ["alina musterfrau", 1337]
            ]
          }),
        }),
      }),
    };


    const e = {
      parameter: {
        user_name: "Wolfgang",
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
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(nextWeeksThursday, "Donnerstag"));
    } else {
      console.log("Expect this weeks Tuesday");
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(thisWeeksThursday, "Donnerstag"));
    }
  });

  it("should return Saturday when being in #training-saturday channel", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          appendRow: () => ({}),
          getDataRange: () => ({
            getValues: () => [
              [""], ["max mustermann", 1337], ["alina musterfrau", 1337]
            ]
          }),
        }),
      }),
    };

    const e = {
      parameter: {
        user_name: "wolfgang",
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
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(nextWeeksSaturday, "Samstag"));
    } else {
      console.log("Expect this weeks Saturday");
      assert.equal(returnValue, createExpectedOutputForSuccessfulWrite(thisWeeksSaturday, "Samstag"));
    }
  });
});

function getThisWeeksDay(plusOneWeek, dayConstant) {
  const date = new Date(Date.now());
  const today = date.getDate();
  const dayOfTheWeek = date.getDay();
  let newDate = new Date(date.setDate(today - dayOfTheWeek + dayConstant));

  if (plusOneWeek) {
    const nextWeeksTraining = new Date(newDate);
    newDate = new Date(
      nextWeeksTraining.setDate(nextWeeksTraining.getDate() + 7)
    );
  }

  return newDate;
}

function createdExpectedOutputForAlreadyParticipating(nextWeeksTuesday, day) {
  return "Du bist schon beim Training " + day + " " +
    getDateInGermanFormat(nextWeeksTuesday) +
    " dabei. Brauchst dich also nicht mehr eintragen! :white_check_mark: :woman-running: :runner: ";
}

function createExpectedOutputForSuccessfulWrite(nextWeeksTuesday, day) {
  return "Du bist beim Training am " + day + " " +
    getDateInGermanFormat(nextWeeksTuesday) +
    " dabei :confetti_ball:";
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
