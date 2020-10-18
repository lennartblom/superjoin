const assert = require("assert")
const {signOut} = require("../src/signOut")


describe("'/austragen' command", function () {
  it("should signOut participant when in spreadsheet", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          getDataRange: () => ({
            getValues: () => [
              [""], ["max musterman", 1337], ["alina musterfrau", 1337]
            ]
          }),
          deleteRow: function (index) {
            console.log("Called with index", index)
            assert.strictEqual(index, 2);
          }
        }),
      }),
    };
    const requestData = {
      parameter: {
        user_name: "max musterman",
        user_id: "a_user_ID",
        command: "/teilnehmer",
        channel_id: "C012C7UEX9C",
        channel_name: "training-dienstag",
      },
    };

    let result = signOut(requestData);

    assert.strictEqual(result[1], true);
    assert.strictEqual(result[0], "Du hast dich erfolgreich vom Training abgemeldet");
  });
  it("should ignore command when is not in spreadsheet", function () {
    global.SpreadsheetApp = {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => ({
          getDataRange: () => ({
            getValues: () => [
              [""], ["max musterman", 1337], ["alina musterfrau", 1337]
            ]
          }),
          deleteRow: function () {
            assert.fail("Row must not be deleted")
          }
        }),
      }),
    };
    const requestData = {
      parameter: {
        user_name: "peter.nicht.angemeldet",
        user_id: "a_user_ID",
        command: "/teilnehmer",
        channel_id: "C012C7UEX9C",
        channel_name: "training-dienstag",
      },
    };

    let result = signOut(requestData);

    assert.strictEqual(result[1], false);
    assert.strictEqual(result[0], "Du bist gar nicht beim Training angemeldet");
  });
});
