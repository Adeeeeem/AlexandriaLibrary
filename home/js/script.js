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
});
/*==================================================
			Document Ready
==================================================*/
$(function()
{
	/* Logout Button */
	$("div#menu button#logout_btn").click(function()
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