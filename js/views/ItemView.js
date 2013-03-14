// view/ItemView.js
( function ( Views ) {

	//Views.ItemView = Backbone.DragDrop.extend({
	Views.ItemView = Backbone.View.extend({

		className: 'row',
		tagName: 'li',
		// get the HTML content of the #guestlist-template template
		itemTemplate: _.template( $( '#template_items' ).html()),

		events:{
			"change"				: "change",
			"click"					: "editItem"
		},

		initialize: function( options ) {

			this.addEditItemView = this.options.addEditItemView;
		},

		render: function() {
			// pass model attributes to template variable
			this.$el.html( this.itemTemplate( this.model.attributes));
			if(this.model.attributes.check) {
				this.$el.addClass('completed');
			}
			if(this.model.attributes.pic === 'b'){
				this.$el.find('.bg').addClass('b');
			} else if( this.model.attributes.pic === 'g'){
				this.$el.find('.bg').addClass('g');
			}
			return this;
		},
		/*
		 *
		 *
		 */
		change: function(event){
			//console.log("change");
			event.stopPropagation();
			// Apply change checkbox
			var target = event.target;
			var change = {};
			change[target.name] = target.checked;
			this.model.save(change)
		},

		/*
		 *edit a Item. 
		 *Arg: events
		 *return: none
		 */
		editItem: function(event) {
			//
			//console.log("editItem");
			event.stopPropagation();
			event.preventDefault();
			this.addEditItemView.model = this.model;
			// 
			this.addEditItemView.render("Edit Task");
		},
		/*
		 *remove a Item. 
		 *Arg: events
		 *return: none
		 */
		removeItem: function(event) {

			this.trigger( 'onDeleteItem', this.model );
			//
			this.$el.remove();
		}


	});
})( App.Views );