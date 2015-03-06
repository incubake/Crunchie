var request = require("request"),
    _ = require("underscore"),
    api_key,
    base = "http://api.crunchbase.com",
    actions = {
        organizations: "/v/2/organizations",
        organization: "/v/2/organization/<%= permalink %>",
        people: "/v/2/people",
        person: "/v/2/person/<%= permalink %>",
        products: "/v/2/products",
        product: "/v/2/product/<%= permalink %>",
        fundingRound: "/v/2/funding-round/<%= uuid %>",
        acquisition: "/v/2/acquisition/<%= uuid %>",
        ipo: "/v/2/ipo/<%= uuid %>",
        fundRaise: "/v/2/fund-raise/<%= uuid %>",
        locations: "/v/2/locations",
        categories: "/v/2/categories"
    },
    logging,
    log = function() {
        if (logging) {
            console.log.apply(this, arguments);
        }
    },
    Crunchie = function(key, debug) {
        api_key = key;
        logging = debug || false;

    },
    _createRequest = function(url, params, cb) {
        var compiledUrl = _.template(base + url),
            uri = compiledUrl(params) + "?user_key=" + api_key,
            callback = cb || function() {};
        log("uri: " + uri);
        request(uri, function(error, response, body) {
            if (_.isEmpty(error)) {
                var parsedBody = JSON.parse(body);
                log(parsedBody.data.items || parsedBody.data);
                callback(parsedBody);
            } else {
                throw new Error(error);
            }
        });
    },
    parseParams = function(type, params, callback) {
        var args = Array.prototype.slice.call(arguments),
            params = {},
            cb = args[args.length - 1],
            callback, type;
        //check for atleast type
        if (args.length < 1) {
            throw new Error("Missing minimum required 'type' param");
        }
        //check for type
        else if (args.length >= 1 && args[0] === "string") {
            type = args[0];
            if (args[1] && !_.isFunction(args[1])) {
                params = args[1];
            }
        }
        //do a check to see if the type we passed is a valid action
        if (!actions[type]) {
            throw new Error("The " + action + " could not be found");
        }
        _createRequest(actions[type], {
            params: params
        }, callback);
    };
_.each(actions, function(action, key) {
    var funcName = key.charAt(0).toUpperCase() + key.slice(1);
    Crunchie.prototype["get" + funcName] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(key);
        parseParams.apply(this, args);
    }
});
module.exports = Crunchie;
