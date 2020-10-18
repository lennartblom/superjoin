const assert = require("assert")
const {notifyChannelAboutNewParticipant} = require("../src/channelNotifications")


const EXPECTED_POST_DATA = {
  method: 'post',
  headers: {
    'Content-type': 'application/json'
  },
  payload: JSON.stringify({text: ":heavy_plus_sign: `max.mustermann` hat sich zum nächsten Training angemeldet!"})
};
describe("channelNotifications component", function () {
  it("should return 404 when no webhook URL is defined", function () {
    global.UrlFetchApp = {
      fetch: function () {
        assert.fail("UrlFetchApp must not be called")
      }
    }
    let result = notifyChannelAboutNewParticipant("test", "max.mustermann");

    assert.strictEqual(result, 404);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.strictEqual(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/TUESDAY");
        assert.deepStrictEqual(options, EXPECTED_POST_DATA);
      }

    }
    let result = notifyChannelAboutNewParticipant("C012C7UEX9C", "max.mustermann");
    assert.strictEqual(result, 200);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.strictEqual(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/THURSDAY");
        assert.deepStrictEqual(options, EXPECTED_POST_DATA);
      }
    }
    let result = notifyChannelAboutNewParticipant("C012K00AJFL", "max.mustermann");
    assert.strictEqual(result, 200);
  });
  it("should post about new participant with tuesday channel URL", function () {
    global.UrlFetchApp = {
      fetch: function (url, options) {
        console.log(url, options);
        assert.strictEqual(url, "https://hooks.slack.com/services/asdasdas/asdasdasd/SATURDAY");
        assert.deepStrictEqual(options, EXPECTED_POST_DATA);
      }

    }
    let result = notifyChannelAboutNewParticipant("C012C7UQPSS", "max.mustermann");
    assert.strictEqual(result, 200);
  });
});
