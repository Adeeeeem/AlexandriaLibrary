/*==================================================
				On Load
==================================================*/
$(window).on("load", function()
{
	/* If User Already Logged In */
	var response = getSession();
	if (response.response == "Access Denied.")
		window.location.href = "../";
	else if (response.response == "Access Granted.")
		window.location.href = "./";
});
/*==================================================
			Document Ready
==================================================*/
$(function()
{
	/*==================================================
					Sign In Section
	==================================================*/
	/* Sign In Display / Hide Password */
	$("div#signin input#signin_password_display").click(function()
	{
		if ($(this).is(":checked"))
		{
			$("div#signin input#signin_password").attr("type", "text");
			$("div#signin label#signin_password_display-label").text("Hide Password");
		}
		else
		{
			$("div#signin input#signin_password").attr("type", "password");
			$("div#signin label#signin_password_display-label").text("Show Password");
		}
	});
	/* Reset Sign In Form */
	$("div#signin button#signin_reset_btn").click(function(){$("div#signin form#signin_form")[0].reset(); resetSignInForm();});
	/* Confirm Sign In */
	$("div#signin button#signin_confirm_btn").click(function()
	{
		/* Reset Sign In Form */
		resetSignInForm();
		/* Verification Variables */
		var verification_signin_login, verification_signin_password;

		/* Check Username */
		verification_signin_login = $("div#signin form#signin_form input#signin_login").val().checkEmptyValue($("div#signin form#signin_form input#signin_login"), $("div#signin form#signin_form small#signin_user_login_empty"));
		/* Check Password */
		verification_signin_password =  $("div#signin form#signin_form input#signin_password").val().checkEmptyValue($("div#signin form#signin_form input#signin_password"), $("div#signin form#signin_form small#signin_password_empty"));

		/* If Everything went well */
		if (verification_signin_login && verification_signin_password)
		{
			var SignIn_Form = $("div#signin form#signin_form");
			var SignInForm_Data = JSON.stringify(SignIn_Form.serializeObject());

			$.ajax
			({
				url: "php/signIn.php",
				type: "POST",
				contentType : "application/json; charset=utf-8",
				dataType: "json",
				data: SignInForm_Data,
			})
			.done(function(response)
			{
				switch (response.response)
				{
					case "Wrong_Username":
						Notification("Failure", "Sorry, we couldn't find an account with that username. !");
						$("div#signin input#signin_login").addClass("uk-form-danger");
						$("div#signin small#signin_user_login_wrong").show();
						$("div#signin input#signin_password").addClass("uk-form-danger");
					break;

					case "Wrong_Password":
						Notification("Failure", "We do not recongize your password. !");
						$("div#signin input#signin_password").addClass("uk-form-danger");
						$("div#signin small#signin_password_wrong").show();
					break;

					case false:
						$("div#signin button#signin_reset_btn").click();
						Notification("Failure", "Oops - Something went wrong ! Please try again later !");
					break;

					case true:
						window.location.href = "./";
						Notification("Success", "Welcome back Sir !");
					break;

					default:
						$("div#signin button#signin_reset_btn").click();
						Notification("Failure", "Oops - Something went wrong ! Please try again later !");
					break
				}
			})
			.fail(function()
			{
				Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			});
		}
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
/* Reset Sign Up Form */
function resetSignInForm()
{
	$("div#signin form#signin_form input").removeClass("uk-form-danger");
	$("div#signin form#signin_form small.error").hide();
}