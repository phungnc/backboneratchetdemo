// collection/FieldSet.js
(function ( Collections, Item ){

	Collections.Items = Backbone.Collection.extend({

		model: Item,

		localStorage: new Store("Todolist"),

		initialize: function(){},

		//nextOrder: function() {

		//	if(!this.length) {
		//		return 1;
		//	}
		//	return this.last().get( 'order' ) + 1;
		//},

		//comparator: function( item ) {
//console.log("comparator");
		//	return item.get( 'order' );
		//}


	})

})(App.Collections, App.Models.Item );