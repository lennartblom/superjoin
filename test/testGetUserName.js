const assert = require("assert")
const {getUserName} = require("../src/getUserName")

describe("getUserName component", function () {
  it("should fetch the user info", function () {
    const mockResponse = {
      getContentText: function () {
        return JSON.stringify({ ok: true, user: { real_name: "Test User" } });
      }
    }

    global.UrlFetchApp = {
      fetch: function (url) {
        assert.strictEqual(url, `https://slack.com/api/users.info?token=xoxb-test&user=a_user_ID`);

        return mockResponse;
      }
    }

    let result = getUserName("nickname", "a_user_ID");

    assert.strictEqual(result, "Test User");
  });

  it("should return the nickname when the user cannot be found", function () {
    const mockResponse = {
      getContentText: function () {
        return JSON.stringify({ ok: false });
      }
    }

    global.UrlFetchApp = {
      fetch: function (url) {
        assert.strictEqual(url, `https://slack.com/api/users.info?token=xoxb-test&user=a_user_ID`);

        return mockResponse;
      }
    }

    let result = getUserName("nickname", "a_user_ID");

    assert.strictEqual(result, "nickname");
  });
});
