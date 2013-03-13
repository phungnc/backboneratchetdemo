// models/Item.js
(function ( Models ) {

		//idAttribute: "_id",

		Models.Item = Backbone.Model.extend({
		// Default attributes for the guest

		defaults: {

			check: false,
			taskTitle: "",
			date: "",
			pic: "bg",
			note: ""
		},

		initialize: function(){}

	});
	
})( App.Models );