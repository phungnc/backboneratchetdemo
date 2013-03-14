// view/AboutView.js
( function ( Views ) {

	Views.AboutView = Backbone.View.extend({

		el: "#myModal",

		aboutTemplate: _.template($('#template_about').html()),

		events:{
			"click .close" 					: "close"
		},

		initialize: function(options) {
			this.render();
		},

		render: function() {
			this.$el.append(this.aboutTemplate());
			this.$el.toggleClass('active');
			this.delegateEvents();
			return this;
		},

		close: function(event) {		
			this.$el.removeClass('active');
			//kill this view
			this.close();
		},

	});
})( App.Views );