var grunt = require("grunt"),
	Crunchie = require("../crunchie"),
	_ = require("underscore"),
	crunchie = new Crunchie("4709f074cab6bd6c9ca6be1afa438b6f", true);

module.exports = {
	organizations: function(test) {
		crunchie.getOrganizations(function(data) {
			test.equal(_.isEmpty(data), false, "test getting organizations");
			test.done();
		});
	},
	organization: function(test) {
		var expected = "0bf726bf19021756ca9ea4c8cd6a90a4";
		crunchie.getOrganization("ziprecruiter", function(data) {
			test.equal(expected, data.data.uuid, "test getting ziprecruiter");
			test.done();
		});
	},
	people: function(test) {
		crunchie.getPeople(function(data) {
			test.equal(_.isEmpty(data), false, "test getting people");
			test.done();
		});
	},
	person: function(test) {
		var expected = "d54ead02da35e0ca8f596b48eb3ba298";
		crunchie.getPerson("john-david", function(data) {
			test.equal(expected, data.data.uuid, "test getting john-david");
			test.done();
		});
	},
	products: function(test) {
		crunchie.getPeople(function(data) {
			test.equal(_.isEmpty(data), false, "test getting products");
			test.done();
		});
	},
	product: function(test) {
		var expected = "611af954cf18c35d01a2900209f1ce54";
		crunchie.getProduct("cloudify", function(data) {
			test.equal(expected, data.data.uuid, "test getting cloudify");
			test.done();
		});
	},
	locations: function(test) {
		crunchie.getLocations(function(data) {
			test.equal(_.isEmpty(data), false, "test getting locations");
			test.done();
		});
	},
	categories: function(test) {
		crunchie.getLocations(function(data) {
			test.equal(_.isEmpty(data), false, "test getting locations");
			test.done();
		});
	},
};