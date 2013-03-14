// view/ItemListView.js
( function ( Views ) {

	Views.ItemListView = Backbone.View.extend({
		
		el: ".iphone-content",

		events: {
			"click #addItem"			: "addItem",
			"click #about"				: "about",
		},
		//
		addEditItemTemplate: _.template($('#template_editItem').html()),
		initialize: function() {

			this.collection.on( 'add', this.renderAll, this );
			//
			this.collection.on( 'reset', this.render, this );
			this.collection.on( 'change', this.render, this );
			//
			this.item 											= new App.Models.Item();
			this.addEditItemView 						= new Views.AddEditItemView( { model:this.item } );
			this.aboutView 									= new Views.AboutView();
			//this.addEditItemView.parentView = this;
			//
			_.bindAll( this, 'deleteItem' );
			_.bindAll( this, 'createItem' );
			//
			//this.collection.fetch();
			this.render();
		},
		//
		render: function() {
			this.renderAll();
			return this;
		},
		//
		renderOne: function( item ) {

			var view = new Views.ItemView( { model:item, addEditItemView: this.addEditItemView } );	
			//var view = new Views.ItemView({ model:item });	
			//
			$( '#itemList' ).append( view.render().el );
			//
			view.bind( 'onDeleteItem', this.deleteItem );
			//
			return view;
		},	
		//
		renderAll: function() {

			$('#itemList').empty();
			//
			this.collection.each ( this.renderOne , this );
			//this.$el.append( this.addEditItemTemplate(this.item.attributes));
		},
		/*
		 *add a new Item
		 *Arg: none
		 *return: none
		 */
		createItem: function(item) {
			//
			//console.log("createItem");
			//
			this.collection.create(item); 
		},
		/*
		 *add a new Item
		 *Arg: none
		 *return: none
		 */
		addItem: function() {
			//
			//console.log("addItem");
			var view;
			//this.addEditItemView.model = this.item.clone();
			this.addEditItemView.model = this.item;
			//
			view = this.addEditItemView.render('New Task');
			//
			//$("#myModal").append(view.el);
			//
			view.bind('onCreateItem',this.createItem);
		},
		/*
		 * Deletes the item with the given item model.
		 * Arg: item: the item model.
		 * return: none
		 */
		deleteItem: function( item ) {
			var removeItemIndex = this.collection.indexOf( item );
			//item.destroy();
			this.collection.each( function( item ) {
				//
				if( item.attributes.order > removeItemIndex ) {
					item.attributes.order = item.attributes.order - 1;
					item.save({silent:true});
				} 
			})
			item.destroy();
			this.renderAll();			
		},
		about: function(){
			this.aboutView.render();
		}

	});
})( App.Views );