(function($) {
	//tests
	var crunchie;
	module("Crunchie", {
		setup: function() {
			crunchie = new Crunchie("4709f074cab6bd6c9ca6be1afa438b6f");
		}
	});
	asyncTest("getOrganization", function() {
		var expected = "0bf726bf19021756ca9ea4c8cd6a90a4";
		crunchie.getOrganization("ziprecruiter", function(data) {
			equal(expected, data.data.uuid, "test getting ziprecruiter");
			start();
		});
	});
	asyncTest("getPerson", function() {
		var expected = "d54ead02da35e0ca8f596b48eb3ba298";
		crunchie.getPerson("john-david", function(data) {
			equal(expected, data.data.uuid, "test getting john-david");
			start();
		});
	});
	asyncTest("getProduct", function() {
		var expected = "611af954cf18c35d01a2900209f1ce54";
		crunchie.getProduct("cloudify", function(data) {
			equal(expected, data.data.uuid, "test getting cloudify");
			start();
		});
	});
})(jQuery);