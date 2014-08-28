(function($) {
    var api_key,
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
        Crunchie = function(key) {
            api_key = key
        },
        _createRequest = function(url, params, cb) {
            var compiledUrl = _.template(base + url),
                uri = compiledUrl(params) + "?user_key=" + api_key,
                callback = cb || function() {};
            $.ajax({
                url: uri,
                dataType: "jsonp",
                async: false,
                success: callback
            });
        };
    Crunchie.prototype.getOrganizations = function() {

    };
    Crunchie.prototype.getOrganization = function(permalink, callback) {
        if (!permalink) {
            throw new Error("The permalink for the organization is required");
        }

        _createRequest(actions.organization, {
            permalink: permalink
        }, callback);
    };
    Crunchie.prototype.getPeople = function(callback) {
        _createRequest(actions.people, {}, callback);
    };
    Crunchie.prototype.getPerson = function(permalink, callback) {
        if (!permalink) {
            throw new Error("The permalink for the organization is required");
        }

        _createRequest(actions.person, {
            permalink: permalink
        }, callback);
    };

    Crunchie.prototype.getProduct = function(permalink, callback) {
        if (!permalink) {
            throw new Error("The permalink for the organization is required");
        }

        _createRequest(actions.product, {
            permalink: permalink
        }, callback);
    };

    window.Crunchie = Crunchie;
})(jQuery);