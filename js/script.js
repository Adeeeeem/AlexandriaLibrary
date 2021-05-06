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
});