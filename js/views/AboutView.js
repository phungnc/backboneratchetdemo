// view/AboutView.js
( function ( Views ) {

	Views.AboutView = Backbone.View.extend({

		el: "#myModal",

		aboutTemplate: _.template($('#template_about').html()),

		events:{
			"click .cancel" 					: "cancel"
		},

		initialize: function(options) {
			//this.render();
		},

		render: function() {
			this.$el.append(this.aboutTemplate());
			this.$el.toggleClass('active');
			this.delegateEvents();
			return this;
		},

		cancel: function(event) {
			event.preventDefault();		
			this.$el.removeClass('active');
			//kill this view
			this.close();
		},
		close: function() {	
			// Keep this.$el for later views.
			this.$el.empty();
			this.unbind();
			// if we want to unbind event from model, then create onClose function.
			//if (this.onClose){
			//	this.onClose();
			//}			
		}		

	});
})( App.Views );