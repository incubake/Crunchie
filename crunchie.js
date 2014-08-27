(function($) {
    var api_key,
        base = "http://api.crunchbase.com",
        actions = {
            organizations: "/v/2/organizations",
            organization: "/v/2/organization/<%= permalink %>",
            people: "/v/2/people",
            person: "/v/2/persion/<%= permalink %>",
            products: "/v/2/products",
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
        _createRequest = function(url, params) {
            var compiledUrl = _.template(base + url),
                uri = compiledUrl(params) + "?user_key=" + api_key,
                ourData;
            return $.ajax({
                url: uri,
                dataType: "jsonp",
                async: false
            });
        };
    Crunchie.prototype.getOrganizations = function() {

    };
    Crunchie.prototype.getOrganization = function(permalink) {
        if (!permalink) {
            throw new Error("The permalink for the organization is required");
        }

        var data = _createRequest(actions.organization, {
            permalink: permalink
        });

        var data2 = data.success(function(data) {
            return data;
        });

        return data2;
    };
    window.Crunchie = Crunchie;
})(jQuery);