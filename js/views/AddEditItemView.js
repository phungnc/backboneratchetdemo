// view/AddEditItemView.js
( function ( Views ) {

	Views.AddEditItemView = Backbone.View.extend({

		el: "#myModal",

		addEditItemTemplate: _.template($('#template_editItem').html()),

		events:{
			//"change" 								  : "change",
			"click .cancel" 					: "cancel",
			"click .save" 					  : "save",		
		},

		initialize: function(options) {},

		render: function(action) {

			// pass data to template variable
			var data = this.model.toJSON();
			_.extend(data,{title: action});
			this.$el.append(this.addEditItemTemplate(data));
			this.$el.toggleClass('active');
			//
			this.delegateEvents();
			//
			return this;
		},
		// any change on form will point to this function
		change: function( event ) {
			// Apply the change to the model
			//console.log("change");
			// Apply the change to the model
			//var target = event.target;
			//var change = {};
			//if(target.type === "checkbox"){
			//	change[target.name] = target.checked;				
			//} else {
			//	change[target.name] = target.value;			
			//}

			//this.model.set(change);	
		},

		save: function( events) {
			//console.log("saveItem");
			event.stopPropagation();
			event.preventDefault();
			
			var newAttrs = this.newAttributes();		
			if(this.model.isNew()) {

				this.model.attributes = this.model.defaults;
				this.trigger('onCreateItem',newAttrs);

			} else {

				this.model.set(newAttrs);
				this.model.save();				

			}

			this.$el.removeClass('active');
			//kill this view
			this.close();
		},
		newAttributes: function()	{
			return {
				check: $("#check").is(':checked'),
				taskTitle: $("#taskTitle").val(),
				date: $("#date").val(),
				pic: $("#pic").val(),
				note: $("#note").val()
			}

		},
		cancel: function( events ) {
			console.log("cancel");			
			event.stopPropagation();
			event.preventDefault();

			if(this.model.id) {
				this.model.fetch();
			} else {
				this.model.attributes = this.model.defaults;
				//this.model.destroy();
			}

			this.$el.removeClass('active');
			//kill this view
			this.close();
		},

		close: function() {
			console.log("close");	
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