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
    getSingleton = function(type, permalink, callback) {
        if (!permalink) {
            throw new Error("The permalink for the organization is required");
        }

        if (!actions[type]) {
            throw new Error("The " + action + " could not be found");
        }

        _createRequest(actions[type], {
            permalink: permalink
        }, callback);
    },
    getCollection = function(type, callback) {
        if (!actions[type]) {
            throw new Error("The " + action + " could not be found");
        }
        _createRequest(actions[type], {}, callback);
    };

Crunchie.prototype.getPerson = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("person");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getPeople = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("people");
    getCollection.apply(this, args);
};
Crunchie.prototype.getOrganization = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("organization");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getOrganizations = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("organizations");
    getCollection.apply(this, args);
};
Crunchie.prototype.getProduct = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("product");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getProducts = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("products");
    getCollection.apply(this, args);
};
Crunchie.prototype.getFunding = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("fundingRound");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getAquisition = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("acquisition");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getIPO = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("ipo");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getFundRaise = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("acquisition");
    getSingleton.apply(this, args);
};
Crunchie.prototype.getLocations = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("locations");
    getCollection.apply(this, args);
};
Crunchie.prototype.getCategories = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift("categories");
    getCollection.apply(this, args);
};

module.exports = Crunchie;