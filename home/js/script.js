/*==================================================
				On Load
==================================================*/
$(window).on("load", function()
{
	/* If User Already Logged In */
	var response = getSession();
	if (response.response == "Access Denied")
		window.location.href = "../";
	else if (response.response == "Librarian Granted")
		window.location.href = "./librarian/";
	else if (response.response == "Admin Granted")
		window.location.href = "./admin/";
	/* Save Last Open Section and Open it when Refreshing */
	if (localStorage.getItem("Alexandria_USER_SECTION") == null){localStorage.setItem("Alexandria_USER_SECTION", "documents");}
	/* Load Last Section */
	$("nav#menu div.uk-navbar-right a#" + localStorage.getItem("Alexandria_USER_SECTION") + "_btn").click();
});
/*==================================================
			Document Ready
==================================================*/
$(function()
{
	/* Switch Between Menu Sections */
	MenuSwitch();
	/* Logout Button */
	$("nav#menu a#logout_btn").click(function()
	{
		$.ajax
		({
			url: "../php/signOut.php",
			type: "POST",
			contentType : "application/json; charset=utf-8",
			dataType: "json"
		})
		.done(function()
		{
			window.location.href = "../";
		});
	});
	/* Display Categories List */
	var Categories = getCategories();
	$("div#sections div#documents div.uk-card-body ul.uk-slider-items").empty();
	for (var i = 0; i < Categories.length; i++)
		$("div#sections div#documents div.uk-card-body div#categories ul.uk-slider-items").append("<li id='"+Categories[i].ID+"'><img width='35' height='35' src='../img/categories/"+Categories[i].NAME+".png'><p>"+Categories[i].NAME+"<br><span>"+Categories[i].DOCUMENTS+" Books</span></p></li>");
	/* Browse by Categories */
	$("div#sections div#documents div.uk-card-body ul.uk-slider-items li img, div#sections div#documents div.uk-card-body ul.uk-slider-items li p").click(function()
	{
		displayBrowseByCategory($(this).parent().attr("id"));
		var DocumentsByCategory = getDocumentsByCategory($(this).parent().attr("id"));
		for (var i = 0; i < DocumentsByCategory.length; i++)
			$("div#sections div#documents div.uk-card-body div#browse_categories ul.uk-slider-items").append("<li id='"+DocumentsByCategory[i].ID+"'><img class='book_cover' width='75' height='150' src='../img/covers/"+DocumentsByCategory[i].COVER+"'><p>"+DocumentsByCategory[i].TITLE+"<br><span>"+DocumentsByCategory[i].TYPE+"</span></p></li>");
	});
});
/*==================================================
				Functions
==================================================*/
/* Get Session Function */
function getSession()
{
	return $.ajax
	({
		url: "../php/session.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Switch Between Menu Sections */
function MenuSwitch()
{
	/* When Clicking on Documents Button in Menu */
	$("nav#menu div.uk-navbar-right a#documents_btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Documents Section */
		$("div#sections div#documents").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_USER_SECTION", "documents");
	});
	/* When Clicking on Librarians Button in Menu */
	$("nav#menu div.uk-navbar-right a#seats_btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Seats Section */
		$("div#sections div#seats").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save to */
		localStorage.setItem("Alexandria_USER_SECTION", "seats");
	});
	/* When Clicking on History Button in Menu */
	$("nav#menu div.uk-navbar-right a#history_btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display History Section */
		$("div#sections div#history").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_USER_SECTION", "history");
	});
	/* When Clicking on Settings Button in Menu */
	$("nav#menu div.uk-navbar-right a#settings_btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Settings Section */
		$("div#sections div#settings").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_USER_SECTION", "settings");
	});
}
/* Hide All Sections */
function HideAllSections()
{
	$("div#sections div#documents").hide();
	$("div#sections div#seats").hide();
	$("div#sections div#history").hide();
	$("div#sections div#settings").hide();

	$("nav#menu div.uk-navbar-right a").removeClass("active");
}
/* Get All Categories */
function getCategories()
{
	return $.ajax
	({
		url: "../php/getCategories.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Display Browse by Category */
function displayBrowseByCategory(id)
{
	$("div#sections div#documents div#browse_categories ul.uk-slider-items").empty();
	$("div#sections div#documents div#browse_categories").show();
	/* Change Category Title */
	$("div#sections div#documents div#browse_categories h3#browse_categories_title").text($("div#sections div#documents div.uk-card-body div#categories ul.uk-slider-items li#"+id+" p").contents().filter(function(){return this.nodeType == 3;}).text());
	$("div#sections div#documents div#browse_categories small#browse_categories_title_books").text($("div#sections div#documents div.uk-card-body div#categories ul.uk-slider-items li#"+id+" p span").text());
}
/* Display Documents by Category */
function getDocumentsByCategory(id)
{
	return $.ajax
	({
		url: "../php/getDocumentsByCategory.php",
		type: "POST",
		dataType: "json",
		data: {category_id: id},
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}