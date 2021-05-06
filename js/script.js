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
	$("div#signup input#signup_password_display").click(function()
	{
		if ($(this).is(":checked"))
		{
			$("div#signup input#signup_password").attr("type", "text");
			$("div#signup label#signup_password_display-label").text("Hide Password");
		}
		else
		{
			$("div#signup input#signup_password").attr("type", "password");
			$("div#signup label#signup_password_display-label").text("Show Password");
		}
	});
	/* Reset Sign Up Form */
	$("div#signup button#signup_reset_btn").click(function(){$("div#signup form#signup_form")[0].reset();});
	/* Confirm Sign Up */
	$("div#signup button#signup_confirm_btn").click(function()
	{
		var Signup_Form = $("div#signup form#signup_form");
		var SignupForm_Data = JSON.stringify(Signup_Form.serializeObject());

		$.ajax
		({
			url: "php/signUp.php",
			type: "POST",
			contentType : "application/json; charset=utf-8",
			dataType: "json",
			data: SignupForm_Data,
		})
		.done(function(response)
		{
			console.log("success "+response);
		})
		.fail(function(response)
		{
			console.log("error "+response);
		});
	});
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
/* Return Categories */
function getCategories()
{
	return $.ajax
	({
		url: "php/getCategories.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Form Data to Json */
$.fn.serializeObject = function()
{ 
	var data = {};
	var element = this.serializeArray();

	$.each(element, function()
	{
		if (data[this.name] !== undefined)
		{
			if (!data[this.name].push)
				data[this.name] = [data[this.name]];

			data[this.name].push(this.value || '');
		}
		else
			data[this.name] = this.value || '';
	});
	
	return data;
};