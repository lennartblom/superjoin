var app = require("../main.js");

var assert = require("assert");

global.SpreadsheetApp = {
  getActiveSpreadsheet: () => ({
    getSheetByName: (variable) => ({
      appendRow: () => ({}),
    }),
  }),
};

global.ContentService = {
  createTextOutput: (variable) => variable,
};

describe("Training day via channel", function () {
  describe("post method", function () {
    it("should return Tuesday when being in #training-dienstag channel", function () {
      const e = {
        parameter: {
          user_name: {},
          command: "/dabei",
          channel_id: "C012C7UEX9C",
          channel_name: "training-dienstag",
        },
      };

      let thisWeeksTuesday = getThisWeeksDay(false, 2);
      let nextWeeksTuesday = getThisWeeksDay(true, 2);
      let returnValue = app._test.doPost(e);

      let expectedOutputThisWeek =
        "Du bist beim Training am Dienstag " +
        getDateInGermanFormat(thisWeeksTuesday) +
        " dabei :confetti_ball:";
      let expectedOutputNextWeek =
        "Du bist beim Training am Dienstag " +
        getDateInGermanFormat(nextWeeksTuesday) +
        " dabei :confetti_ball:";

      if (thisWeeksTuesday < Date.now()) {
        console.log("Expect next weeks Tuesday");
        assert.equal(expectedOutputNextWeek, returnValue);
      } else {
        console.log("Expect this weeks Tuesday");
        assert.equal(expectedOutputThisWeek, returnValue);
      }
    });

    it("should return Thursday when being in #training-donnerstag channel", function () {
      const e = {
        parameter: {
          user_name: {},
          command: "/dabei",
          channel_id: "C012K00AJFL",
          channel_name: "training-donnerstag",
        },
      };

      let thisWeeksThursday = getThisWeeksDay(false, 4);
      let nextWeeksThursday = getThisWeeksDay(true, 4);
      let returnValue = app._test.doPost(e);

      let expectedOutputThisWeek =
        "Du bist beim Training am Donnerstag " +
        getDateInGermanFormat(thisWeeksThursday) +
        " dabei :confetti_ball:";
      let expectedOutputNextWeek =
        "Du bist beim Training am Donnerstag " +
        getDateInGermanFormat(nextWeeksThursday) +
        " dabei :confetti_ball:";

      if (thisWeeksThursday < Date.now()) {
        console.log("Expect next weeks Thursday");
        assert.equal(expectedOutputNextWeek, returnValue);
      } else {
        console.log("Expect this weeks Tuesday");
        assert.equal(expectedOutputThisWeek, returnValue);
      }
    });

    it("should return Saturday when being in #training-saturday channel", function () {
      const e = {
        parameter: {
          user_name: {},
          command: "/dabei",
          channel_id: "C012C7UQPSS",
          channel_name: "training-samstag",
        },
      };

      let thisWeeksSaturday = getThisWeeksDay(false, 6);
      let nextWeeksSaturday = getThisWeeksDay(true, 6);
      let returnValue = app._test.doPost(e);

      let expectedOutputThisWeek =
        "Du bist beim Training am Samstag " +
        getDateInGermanFormat(thisWeeksSaturday) +
        " dabei :confetti_ball:";
      let expectedOutputNextWeek =
        "Du bist beim Training am Samstag " +
        getDateInGermanFormat(nextWeeksSaturday) +
        " dabei :confetti_ball:";

      if (thisWeeksSaturday < Date.now()) {
        console.log("Expect next weeks Saturday");
        assert.equal(expectedOutputNextWeek, returnValue);
      } else {
        console.log("Expect this weeks Saturday");
        assert.equal(expectedOutputThisWeek, returnValue);
      }
    });
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

function getDateInGermanFormat(newDate) {
  return (
    newDate.getUTCDate() +
    "." +
    (newDate.getMonth() + 1) +
    "." +
    newDate.getFullYear()
  );
}
