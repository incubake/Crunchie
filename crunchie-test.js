(function($) {
	//tests
	var crunchie,
		actual;
	module("Crunchie", {
		setup: function() {
			crunchie = new Crunchie("4709f074cab6bd6c9ca6be1afa438b6f");
		}
	});
	asyncTest("getOrganization", function() {
		actual = crunchie.getOrganization("ziprecruiter");
		setTimeout(function() {
			ok(1);
			start();
		}, 3000);
	});
})(jQuery);