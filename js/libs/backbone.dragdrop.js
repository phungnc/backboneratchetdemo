/* 
 * contact: phungnc@gmail.com
 * This is Backbone Drag Drop plugin for handling drag and drop operation with transparent support
 * for both mouse and touch events.
 * This Backbone is create base on: https://github.com/mikeplate/jquery-drag-drop-plugin
 */

/*globals Backbone:true, _:true, jQuery:true*/
Backbone.DragDrop = (function (Backbone, _, $){
	"use strict";
	var DragDrop = function(options){
		// DragDrop initialization 
		//console.log("Backbone.DragDrop initialize");
		options || (options = {});
		this.options = _.defaults(options,this.defaultOptions);
		Backbone.View.apply(this,options);
		_.bindAll(this, 'onStart');
	};


	_.extend(DragDrop.prototype, Backbone.View.prototype,{

			defaultOptions :{
				makeClone: true,  // Drag a clone of the source, and not the actual source element
				sourceClass: null, // Class to apply to source element when dragging a clone of the source element
				sourceHide: true, // Specify with true that the source element should hade visibility:hidden while dragging a clone
				dragClass: "shadow",   // Class to apply to the element that is dragged
				canDropClass: null, // Class to apply to the dragged element when dropping is possible
				dropClass: null,
				isActive: true,
				container: null, // if set, dragging is limited to this container

				// Default is to allow all elements to be dragged
				canDrag: function($src, event) {
						return $src;
				},

				// Default is to allow dropping inside elements with css stylesheet "drop"
				canDrop: function($dst) {
						return $dst.hasClass("drop") || $dst.parents(".drop").size()>0;
				},

				// Default is to move the element in the DOM and insert it into the element where it is dropped
				didDrop: function($src, $dst) {
						$src.appendTo($dst);
				}
		},

		// Status during a drag-and-drop operation. Only one such operation can be in progress at any given time.
		$sourceElement : null, // Element that user wanted to drag
		$activeElement : null, // Element that is shown moving around during drag operation
		$destElement : null,   // Element currently highlighted as possible drop destination
		dragOffsetX : 0,
		dragOffsetY: 0, // Position difference from drag-point to active elements left top corner
		limits: "",

		options: null,

		cancelDestElement: function(options) {
				if (this.$destElement!=null) {
					if (options.dropClass)
						this.$destElement.removeClass(options.dropClass);
						this.$destElement = null;
				}
				if (this.$activeElement!=null) {
					if (options.canDropClass) {
						this.$activeElement.removeClass(options.canDropClass);
					}
				}
		},

		destroy: function(){
			this.unbind("mousedown.dragdrop touchstart.dragdrop");
		},

		on: function(){
			//this.data("options").isActive = true;
			this.options.isActive = true;
		},

		off: function(){
			this.options.isActive = false;
		},		

		onStart: function(){
			var self = this;
			var options = self.options;
			if(!options.isActive) return;

			var $element = this.canDrag(self, event).$el;
			if($element){
				this.$sourceElement = $element;
				var offset = this.$sourceElement.offset();
				var width  = this.$sourceElement.width();
				var height = this.$sourceElement.height();
				if (event.type == "touchstart"){
					this.dragOffsetX = event.originalEvent.touches[0].clientX - offset.left;
					this.dragOffsetY = event.originalEvent.touches[0].clientY - offset.top;
				} else {
					this.dragOffsetX = event.pageX - offset.left;
					this.dragOffsetY = event.pageY - offset.top;
				}

				if (options.makeClone){

					this.$activeElement = this.$sourceElement.clone(false);
					// add draged Element to Parent in order to get any cascading styles applied
					this.$activeElement.appendTo($element.parent());
					if(options.sourceClass) this.$sourceElement.addClass(options.sourceClass);
					else if (options.sourceHide) this.$sourceElement.css("visibility","hidden");
					//else if (options.sourceHide) this.$sourceElement.css("opacity","0.5");

				} else {

					this.$activeElement = this.$sourceElement;

				}

				this.$activeElement.css({

					position: "absolute",
					left: offset.left,
					top: offset.top,
					width: width,
					height:height
				});

				if(options.dragClass) this.$activeElement.addClass(options.dragClass);
				
				var $c = options.container;

				if($c){
					var offset = $c.offset();
					self.limits = {
						minX: offset.left,
						minY: offset.top,
						maxX: offset.left + $c.outWidth() - $element.outerWidth(),
						maxY: offset.top  + $c.outHeight() - $element.outerHeight()
					};
				}

				$(window)
					.bind("mousemove.dragdrop touchmove.dragdrop",{source: self}, this.onMove)
					.bind("mouseup.dragdrop touchend.dragdrop",{source: self}, this.onEnd);
				//Stop the click event from bubbling to parent elements
				event.stopPropagation();
				return false;
			}
		},

		onMove: function(event){
			// self = this view context
			var self = event.data.source;
			if (!self.$activeElement) return;
			var options = self.options;

			var posX, posY;
			if(event.type == "touchmove"){
				posX = event.originalEvent.touches[0].clientX;
				posY = event.originalEvent.touches[0].clientY;
			} else {
				posX = event.pageX;
				posY = event.pageY;
			}
			self.$activeElement.css("display","none");
			var destElement = document.elementFromPoint(
					posX - document.documentElement.scrollLeft - document.body.scrollLeft,
					posY - document.documentElement.scrollTop  - document.body.scrollTop
				);
			self.$activeElement.css("display","");
			posX -= self.dragOffsetX;
			posY -= self.dragOffsetY;
			if(self.limits){
				// perform mathematical tasks.
				posX = Math.min(Math.max(posX,self.limits.minX), self.limits.maxX);
				posY = Math.min(Math.max(posY,self.limits.minY), self.limits.maxY);
			}
			self.$activeElement.css({left: posX, top: posY});

			if(destElement){

				if(self.$destElement==null || self.$destElement.get(0) != destElement){
					var $possibleDestElement = $(destElement);
					if(self.canDrop($possibleDestElement)){

						if(options.dropClass){
							if(self.$destElement == null) self.$destElement.removeClass(options.dropClass);
							$possibleDestElement.addClass(options.dropClass);
						}

						if(self.canDropClass){
							self.$activeElement.addClass(options.canDropClass);
						}

						self.$destElement = $possibleDestElement;
					}
					else if (self.$destElement != null) {
						self.cancelDestElement(options);
					}
				}
			}
			else if (self.$destElement != null) {
				self.cancelDestElement(options)
			}
			event.stopPropagation();
			return false;
		},

		onEnd: function(event){
			// self = this view context
			var self = event.data.source;
			if (!self.$activeElement) return;
			var options = self.options;

			if(self.$destElement){
				self.didDrop(self.$sourceElement,self.$destElement);
			}
			self.cancelDestElement(options);

			if(options.makeClone){
				self.$activeElement.remove();
				if(options.sourceClass)
					self.$sourceElement.removeClass(options.sourceClass);
				else if (options.sourceHide) {
					self.$sourceElement.css("visibility","visible");
				}
			}
			else {
				self.$activeElement.css("position", "static");
				self.$activeElement.css("height","");
				self.$activeElement.css("width","");
				if(options.dragClass)
					self.$activeElement.removeClass(options.dragClass);
			}

			$(window).unbind("mousemove.dragdrop touchmove.dragdrop");
			$(window).unbind("mouseup.dragdrop touchend.dragdrop");
			self.$sourceElement = self.$activeElement = self.limits = null;
		},	
		// Private helper methods

	});
	DragDrop.extend = Backbone.View.extend;
	//
	return DragDrop;

}( Backbone, _, jQuery ));