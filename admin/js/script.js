/*==================================================
				On Load
==================================================*/
$(window).on("load", function()
{
	/* If User Already Logged In */
	var response = getSession();
	if (response.response == "Access Denied.")
		window.location.href = "../";
	else if (response.response == "Access Pending.")
		window.location.href = "./login.html";
	/* Save Last Open Section and Open it when Refreshing */
	if (localStorage.getItem("Alexandria_ADMIN_SECTION") == null){localStorage.setItem("Alexandria_ADMIN_SECTION", "documents");}
	/* Load Last Section */
	$("div#menu button#" + localStorage.getItem("Alexandria_ADMIN_SECTION") + "-btn").click();
});
/*==================================================
			Document Ready
==================================================*/
$(function()
{
	/*==================================================
					Menu
	==================================================*/
	/* Switch Between Menu Sections */
	MenuSwitch();
	/* Logout Button */
	$("div#menu button#logout-btn").click(function()
	{
		$.ajax
		({
			url: "php/signOut.php",
			type: "POST",
			contentType : "application/json; charset=utf-8",
			dataType: "json"
		})
		.done(function()
		{
			window.location.href = "../";
		});
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
		url: "php/session.php",
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
	$("div#menu button#documents-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Documents Section */
		$("div#documents").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "documents");
	});
	/* When Clicking on Librarians Button in Menu */
	$("div#menu button#librarians-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Documents Section */
		$("div#librarians").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save to */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "librarians");
	});
	/* When Clicking on Users Button in Menu */
	$("div#menu button#users-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Users Section */
		$("div#users").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "users");
	});
	/* When Clicking on Seats Button in Menu */
	$("div#menu button#seats-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Seats Section */
		$("div#seats").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "seats");
	});
	/* When Clicking on History Button in Menu */
	$("div#menu button#history-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display History Section */
		$("div#history").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "history");
	});
	/* When Clicking on settings Button in Menu */
	$("div#menu button#settings-btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display settings Section */
		$("div#settings").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "settings");
	});
}
/* Hide All Sections */
function HideAllSections()
{
	$("div#documents").hide();
	$("div#librarians").hide();
	$("div#users").hide();
	$("div#seats").hide();
	$("div#history").hide();
	$("div#settings").hide();

	$("div#menu button").removeClass("active");
}