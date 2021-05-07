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
	/* Confirm Sign In */
	
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
	$("div#signup button#signup_reset_btn").click(function(){$("div#signup form#signup_form")[0].reset(); resetSignUpForm();});
	/* Confirm Sign Up */
	$("div#signup button#signup_confirm_btn").click(function()
	{
		/* Reset Sign Up Form */
		resetSignUpForm();
		/* Verification Variables */
		var verification_signup_first_name, verification_signup_last_name, verification_signup_user_card, verification_signup_login, verification_signup_password, verification_signup_repeat_password, verification_signup_email;

		/* Check Username */
		verification_signup_first_name = $("div#signup form#signup_form input#signup_first_name").val().checkValue($("div#signup form#signup_form input#signup_first_name"), /^[A-Za-z ]{3,50}$/, $("div#signup form#signup_form small#signup_first_name_empty"), $("div#signup form#signup_form small#signup_first_name_format"));
		verification_signup_last_name = $("div#signup form#signup_form input#signup_last_name").val().checkValue($("div#signup form#signup_form input#signup_last_name"), /^[A-Za-z ]{3,50}$/, $("div#signup form#signup_form small#signup_last_name_empty"), $("div#signup form#signup_form small#signup_last_name_format"));
		verification_signup_user_card = $("div#signup form#signup_form input#signup_user_card").val().checkValue($("div#signup form#signup_form input#signup_user_card"), /^[0-9]{8,20}$/, $("div#signup form#signup_form small#signup_user_card_empty"), $("div#signup form#signup_form small#signup_user_card_format"));
		verification_signup_login =  $("div#signup form#signup_form input#signup_login").val().checkValue($("div#signup form#signup_form input#signup_login"), /^[A-Za-z0-9_]{3,25}$/, $("div#signup form#signup_form small#signup_user_login_empty"), $("div#signup form#signup_form small#signup_user_login_format"));
		verification_signup_password = $("div#signup form#signup_form input#signup_password").val().checkValue($("div#signup form#signup_form input#signup_password"), /^(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%@&\?].*).{8,30}$/, $("div#signup form#signup_form small#signup_password_empty"), $("div#signup form#signup_form small#signup_password_format"));
		verification_signup_repeat_password = $("div#signup form#signup_form input#signup_repeat_password").val().checkPassword($("div#signup form#signup_form input#signup_repeat_password"), $("div#signup form#signup_form input#signup_password").val(), $("div#signup form#signup_form small#signup_repeat_password_empty"), $("div#signup form#signup_form small#signup_repeat_password_format"));
		verification_signup_email = $("div#signup form#signup_form input#signup_email").val().checkValue($("div#signup form#signup_form input#signup_email"), /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, $("div#signup form#signup_form small#signup_email_empty"), $("div#signup form#signup_form small#signup_email_format"));
		
		if (verification_signup_first_name && verification_signup_last_name && verification_signup_user_card && verification_signup_login && verification_signup_password && verification_signup_repeat_password && verification_signup_email)
		{
			var SignUp_Form = $("div#signup form#signup_form");
			var SignUpForm_Data = JSON.stringify(SignUp_Form.serializeObject());

			$.ajax
			({
				url: "php/signUp.php",
				type: "POST",
				contentType : "application/json; charset=utf-8",
				dataType: "json",
				data: SignUpForm_Data,
			})
			.done(function(response)
			{
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
		}
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
/* Check if Variable is Empty */
String.prototype.isEmpty = function()
{
	return (this == null || this == undefined || this == "");
}
/* Check Format of Input */
String.prototype.isFormat = function(RegularExpression)
{
	return new RegExp(RegularExpression).test(this);
}
/* Check Variable */
String.prototype.checkValue = function(Input, RegularExpression, EmptyAlert, FormatAlert)
{
	if (this.isEmpty())
	{
		Input.addClass("uk-form-danger");
		EmptyAlert.show();
		return false;
	}
	else
	{
		if (!this.isFormat(RegularExpression))
		{
			Input.addClass("uk-form-danger");
			FormatAlert.show();
			return false;
		}
		else
		{
			Input.removeClass("uk-form-danger");
			EmptyAlert.hide();
			FormatAlert.hide();
		}
	}

	return true;
}
/* Check Password Match */
String.prototype.matchPassword = function(Password)
{
	return this == Password;
}
/* Check Password */
String.prototype.checkPassword = function(Input, Value, EmptyAlert, FormatAlert)
{
	if (this.isEmpty())
	{
		Input.addClass("uk-form-danger");
		EmptyAlert.show();
		return false;
	}
	else
	{
		if (!this.matchPassword(Value))
		{
			Input.addClass("uk-form-danger");
			FormatAlert.show();
			return false;
		}
		else
		{
			Input.removeClass("uk-form-danger");
			EmptyAlert.hide();
			FormatAlert.hide();
		}
	}

	return true;
}