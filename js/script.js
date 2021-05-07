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
			/* Reset Sign Up Form */
			resetSignUpForm();

			switch (response.response)
			{
				case "Login_Exists":
					Notification("Failure", "Username Already Exists ! Please try another Username !");
					$("div#signup input#signup_login").addClass("uk-form-danger");
					$("div#signup small#signup_user_login_exists").show();
				break;

				case "Email_Exists":
					Notification("Failure", "Email Already Exists ! Please try another Email Address !");
					$("div#signup input#signup_email").addClass("uk-form-danger");
					$("div#signup small#signup_user_email_exists").show();
				break;

				case "Card_Exists":
					Notification("Failure", "Student Card / National Identity Card Already Exists !");
					$("div#signup input#signup_user_card").addClass("uk-form-danger");
					$("div#signup small#signup_user_card_exists").show();
				break;

				case true:
					$("div#signup button#signup_reset_btn").click();
					ReportNotification("Info", "Welcome Aboard Alexandrian !", "You are now a registered user. To complete your account's features, go to the Alexandria Library to get approved by the Librarian !", "I Understand !");
					$("a#NXReportButton.notiflix-report-button").click(function(){Notification("Success", "You are now an Alexandrian Member !");});
				break;

				case false: Notification("Failure", "Oops - Something went wrong ! Please try again later !"); break;

				default: Notification("Failure", "Oops - Something went wrong ! Please try again later !"); break;
			}
		})
		.fail(function()
		{
			Notification("Failure", "Oops - Something went wrong ! Please try again later !");
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
/* Reset Sign Up Form */
function resetSignUpForm()
{
	$("div#signup form#signup_form input").removeClass("uk-form-danger");
	$("div#signup form#signup_form small.error").hide();
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

			data[this.name].push(this.value.replace(/\s{2,}/g, "").trim() || "");
		}
		else
			data[this.name] = this.value.replace(/\s{2,}/g, "").trim() || "";
	});
	
	return data;
};