//app.js
//Top-level namespaces for our code

(function(){

	window.App = {};
	App.Collections = {};
	App.Models = {};
	App.Views = {};
	App.Utils = {};

	utils.loadTemplate('items');
	utils.loadTemplate('editItem');
	//Clean View Zombies
	//Ref: http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
	Backbone.View.prototype.close = function(){
		this.remove();
		this.unbind();
		if (this.onClose){
			this.onClose();
		}
	}
	// Defer initialization until doc ready.
	$(function(){
			App.Collections.items 	= new App.Collections.Items();
			App.Collections.items.fetch();
			//For the first time the application is started
			if (!App.Collections.items.length) {
				initTasks();
				App.Collections.items.fetch();
			}			
			//
			App.Views.itemListView	= new App.Views.ItemListView({collection:App.Collections.items});
	});

	var initTasks = function()	{
		var tasks = [
		{
			check: false,
			taskTitle: "Start organizing! Create a notebook or binder for your wedding ideas and vision",
			date: "2013-02-14",
			pic: "bg",
			note: "Start your wedding scrapbook so you can easily save ideas, browse our Wedding Planning 101 area and get access to all of our wedding planning tools."
		},
		{
			check: false,
			taskTitle: "Spread the news to friends and family",
			date: "2013-02-14",
			pic: "bg",
			note: "Check out these creative ideas for announcing your engagement"
		},
		{
			check: false,
			taskTitle: "Decide on your wedding budget and figure out who's contributing",
			date: "2013-02-14",
			pic: "bg",
			note: "Use our wedding budget calculator to get started. Planning Pointer: Sign up for our Daily Deals to get discounts on all things wedding related."
		},
		{
			check: false,
			taskTitle: "Talk to caterers in your area",
			date: "2013-02-14",
			pic: "bg",
			note: "Read reviews, talk to recently married friends and ask around for recommendations."
		},
		{
			check: false,
			taskTitle: "Decide if premarital counseling is right for you and, if so, make an appointment.",
			date: "2013-02-14",
			pic: "b",
			note: ""
		},
		{
			check: false,
			taskTitle: "Visit reception sites in your area, and don't settle until you've found the perfect spot. ",
			date: "2013-02-14",
			pic: "b",
			note: "Remember -- your reception venue will help set the tone, mood and even the dress code for your wedding day."
		},
		{
			check: false,
			taskTitle: "Look for a ceremony officiant in your area",
			date: "2013-02-14",
			pic: "g",
			note: "if you don't already have one picked out)"
		},
		{
			check: false,
			taskTitle: "Finalize your honeymoon plans and book your flights and accommodations,",
			date: "2013-02-14",
			pic: "g",
			note: ""
		},
		{
			check: false,
			taskTitle: "Start your wedding work out plan!",
			date: "2013-02-14",
			pic: "bg",
			note: "Whether you're planning on losing weight, toning up or just staying healthy, now's the time to start on a steady plan. Planning Pointer: Get your fiance involved too, we promise it'll be more fun to sweat it out together."
		},
		{
			check: false,
			taskTitle: "Thinking about your formalwear if you haven't already done so",
			date: "2013-02-14",
			pic: "bg",
			note: "Decide on what the groom and groomsmen will be wearing (tuxes, suits, casual button-downs, etc.). Browse our formalwear and bridal party galleries to get ideas. Planning Pointer: This is a great way to get the groom involved. Why not leave the choice of formalwear up to him?"
		},
		{
			check: false,
			taskTitle: "Finalize your wedding guest list",
			date: "2013-02-14",
			pic: "bg",
			note: "using our simple guest list manager and make sure you have everyone's mailing address."
		},
		{
			check: false,
			taskTitle: "Spread the news to friends and family",
			date: "2013-02-14",
			pic: "bg",
			note: "Check out these creative ideas for announcing your engagement"
		},
		{
			check: false,
			taskTitle: "Book your rehearsal dinner venue and review menu options.",
			date: "2013-02-14",
			pic: "bg",
			note: ""
		},
		{
			check: false,
			taskTitle: "Book your wedding night suite if you haven't already.",
			date: "2013-02-14",
			pic: "bg",
			note: ""
		},
		{
			check: false,
			taskTitle: "Time to address those invitations.",
			date: "2013-02-14",
			pic: "g",
			note: "Drop them off with your calligrapher, if you have one, or handwrite the addresses yourself. Planning Pointer: Make sure you've dropped them in the mail by the three-month mark."
		},
		{
			check: false,
			taskTitle: "Shop for your wedding bands",
			date: "2013-02-14",
			pic: "g",
			note: " if you don't already have something in mind. Order them with at least three months to go especially if you're planning to get them engraved."
		},
		{
			check: false,
			taskTitle: "Choose a marriage contract for the ceremony",
			date: "2013-02-14",
			pic: "b",
			note: "(a ketubah or other religious contract), if one is required."
		},
		{
			check: false,
			taskTitle: "Figure out your ceremony decor",
			date: "2013-02-14",
			pic: "b",
			note: "you might want: flower petals, a flower girl basket, a ring bearer pillow, program basket, aisle runner, huppah."
		},
		{
			check: false,
			taskTitle: "Get your wedding dress and veil ",
			date: "2013-02-14",
			pic: "b",
			note: ""
		},
		{
			check: false,
			taskTitle: "Make sure all of your vendors have been paid in full",
			date: "2013-02-14",
			pic: "bg",
			note: ""
		}										
		
		];
		App.Collections.items.update(tasks);
		App.Collections.items.each(function(item)	{
			item.save();		
		});
	}


})();
