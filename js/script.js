/*==================================================
				On Load
==================================================*/
$(window).on("load", function()
{

});
/*==================================================
			Document Ready
==================================================*/
$(function()
{
	/*==================================================
					Sign Up Section
	==================================================*/
	/* Display / Hide Password */
	$("div#signup input#signup-password-display").click(function()
	{
		if ($(this).is(":checked"))
		{
			$("div#signup input#signup-password").attr("type", "text");
			$("div#signup label#signup-password-display-label").text("Hide Password");
		}
		else
		{
			$("div#signup input#signup-password").attr("type", "password");
			$("div#signup label#signup-password-display-label").text("Show Password");
		}
	});
	/* Reset Sign Up Form */
	$("div#signup button#signup-reset-btn").click(function(){$("div#signup form#signup-form")[0].reset();});
	/*==================================================
					Browse Section
	==================================================*/
	var Categories = getCategories();
	$("div#browse div.uk-card-body ul.uk-slider-items").empty();
	for (var i = 0; i < Categories.length; i++)
	{
		$("div#browse div.uk-card-body ul.uk-slider-items").append("<li id='"+Categories[i].ID+"'><img width='50' height='50' src='img/icons/"+Categories[i].NAME+".png'><p>"+Categories[i].NAME+"<br><span>"+Categories[i].DOCUMENTS+" Books</span></p></li>");
	}
});
/*==================================================
				Functions
==================================================*/
function getCategories()
{
	return $.ajax
	({
		url: "php/getCategories.php",
		type: "POST",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}