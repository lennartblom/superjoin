const assert = require("assert");
const {listParticipants} = require("../src/listParticipants");

global.ContentService = {
    createTextOutput: (variable) => variable,
};

describe("`/teilnehmer` command", function () {
    it("should return 2 participants of spreadsheet data", function () {
        global.SpreadsheetApp = {
            getActiveSpreadsheet: () => ({
                getSheetByName: () => ({
                    getDataRange: () => ({
                        getValues: () => [
                            [""], ["max musterman", 1337], ["alina musterfrau", 1337]
                        ]
                    }),
                }),
            }),
        };
        const requestData = {
            parameter: {
                user_name: {},
                command: "/teilnehmer",
                channel_id: "C012C7UEX9C",
                channel_name: "training-dienstag",
            },
        };

        let returnValue = listParticipants(requestData);

        assert.equal(returnValue, EXPECTED_VALUE_TWO_PARTICIPANTS);
    });

    it("should return 3 participants of spreadsheet data", function () {
        global.SpreadsheetApp = {
            getActiveSpreadsheet: () => ({
                getSheetByName: () => ({
                    getDataRange: () => ({
                        getValues: () => [
                            [""], ["max musterman", 1337], ["klaus störtebecker", 13378], ["alina musterfrau", 1337]
                        ]
                    }),
                }),
            }),
        };
        const requestData = {
            parameter: {
                user_name: {},
                command: "/teilnehmer",
                channel_id: "C012C7UEX9C",
                channel_name: "training-dienstag",
            },
        };

        let returnValue = listParticipants(requestData);

        assert.equal(returnValue, EXPECTED_VALUE_THREE_PARTICIPANTS);
    });
});


const EXPECTED_VALUE_TWO_PARTICIPANTS = '\n' +
    ':eilbeck: *Trainingsteilnehmer am `Dienstag 13.10.2020`* :page_with_curl:\n' +
    '```\n' +
    '• max musterman\n' +
    '• alina musterfrau\n' +
    '```';

const EXPECTED_VALUE_THREE_PARTICIPANTS = '\n' +
  ':eilbeck: *Trainingsteilnehmer am `Dienstag 13.10.2020`* :page_with_curl:\n' +
  '```\n' +
  '• max musterman\n' +
  '• klaus störtebecker\n' +
  '• alina musterfrau\n' +
  '```';
