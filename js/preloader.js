/*==================================================
				Preloader
==================================================*/
$(window).on("load",
 function()
{
	$("#status").fadeOut();
	$("#preloader").delay(350).fadeOut("slow");
});
/*==================================================
			Notification
==================================================*/
/* Notification */
function Notification(Type, Message)
{
	Notiflix.Notify.Init
	({
		width: "350px",
		position: "right-top",
		distance: "10px",
		opacity: 1,
		borderRadius: "15px",
		rtl: false,
		timeout: 5000,
		messageMaxLength: 110,
		backOverlay: false,
		backOverlayColor: "rgba( 255, 255, 255, 0.7)",
		plainText: true,
		showOnlyTheLastOne: false,
		clickToClose: false,
		pauseOnHover: true,
		ID: "NotiflixNotify",
		className: "notiflix-notify",
		zindex: 4001,
		useGoogleFont: false,
		fontFamily: "Raleway",
		fontSize: "14px",
		cssAnimation: true,
		cssAnimationDuration: 400,
		cssAnimationStyle: "fade",
		closeButton: false,
		useIcon: true,
		useFontAwesome: false,
		fontAwesomeIconStyle: "basic",
		fontAwesomeIconSize: "34px",
		success: {background: "#32c682", textColor: "#fff", childClassName: "success", notiflixIconColor: "rgba(255, 255, 255, 0.5)", fontAwesomeClassName: "fas fa-check-circle", fontAwesomeIconColor: "rgba(255, 255, 255, 0.5)", backOverlayColor: "rgba(50, 198, 130, 0.3)"},
		failure: {background: "#ff5549", textColor: "#fff", childClassName: "failure", notiflixIconColor: "rgba(255, 255, 255, 0.5)", fontAwesomeClassName: "fas fa-times-circle", fontAwesomeIconColor: "rgba(255, 255, 255, 0.5)", backOverlayColor: "rgba(255, 85, 73, 0.3)"},
		warning: {background: "#eebf31", textColor: "#fff", childClassName: "warning", notiflixIconColor: "rgba(255, 255, 255, 0.5)", fontAwesomeClassName: "fas fa-exclamation-circle", fontAwesomeIconColor: "rgba(255, 255, 255, 0.5)", backOverlayColor: "rgba(238, 191, 49, 0.3)"},
		info: {background: "#26c0d3", textColor: "#fff", childClassName: "info", notiflixIconColor: "rgba(255, 255, 255, 0.5)", fontAwesomeClassName: "fas fa-info-circle", fontAwesomeIconColor: "rgba(255, 255, 255, 0.5)", backOverlayColor: "rgba(38, 192, 211, 0.3)",}
	});

	switch (Type)
	{
		case "Success": Notiflix.Notify.Success(Message); break;
		case "Failure": Notiflix.Notify.Failure(Message); break;
		case "Warning": Notiflix.Notify.Warning(Message); break;
		case "Info": Notiflix.Notify.Info(Message); break;
	}
}
/* Report Notification */
function ReportNotification(Type, Title, Message, Button)
{
	Notiflix.Report.Init
	({
		className: "notiflix-report",
		width: "420px",
		backgroundColor: "#f8f8f8",
		borderRadius: "15px",
		rtl: false,
		zindex: 4002,
		backOverlay: true,
		backOverlayColor: "rgba(0, 0, 0, 0.5)",
		useGoogleFont: false,
		fontFamily: "Raleway",
		svgSize: "110px",
		plainText: true,
		titleFontSize: "20px",
		titleMaxLength: 34,
		messageFontSize: "15px",
		messageMaxLength: 400,
		buttonFontSize: "14px",
		buttonMaxLength: 34,
		cssAnimation: true,
		cssAnimationDuration: 360,
		cssAnimationStyle: "fade",
		success: {svgColor: "#32c682", titleColor: "#1e1e1e", messageColor: "#242424", buttonBackground: "#32c682", buttonColor: "#fff", backOverlayColor: "rgba(50, 198, 130, 0.3)"},
		failure: {svgColor: "#ff5549", titleColor: "#1e1e1e", messageColor: "#242424", buttonBackground: "#ff5549", buttonColor: "#fff", backOverlayColor: "rgba(255, 85, 73, 0.3)"},
		warning: {svgColor: "#eebf31", titleColor: "#1e1e1e", messageColor: "#242424", buttonBackground: "#eebf31", buttonColor: "#fff", backOverlayColor: "rgba(238, 191, 49, 0.3)"},
		info: {svgColor: "#26c0d3", titleColor: "#1e1e1e", messageColor: "#242424", buttonBackground: "#26c0d3", buttonColor: "#fff", backOverlayColor: "rgba(38, 192, 211, 0.3)"}
	});

	switch (Type)
	{
		case "Success": Notiflix.Report.Success(Title, Message, Button); break;
		case "Failure": Notiflix.Report.Failure(Title, Message, Button); break;
		case "Warning": Notiflix.Report.Warning(Title, Message, Button); break;
		case "Info": Notiflix.Report.Info(Title, Message, Button); break;
	}
}
/*==================================================
				Functions
==================================================*/
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
/* Check Sign In Variable */
String.prototype.checkEmptyValue = function(Input, EmptyAlert)
{
	if (this.isEmpty())
	{
		Input.addClass("uk-form-danger");
		EmptyAlert.show();
		return false;
	}
	else
	{
		Input.removeClass("uk-form-danger");
		EmptyAlert.hide();
	}

	return true;
}
/* Check Sign Up Variable */
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