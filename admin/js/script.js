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
	$("div#menu button#" + localStorage.getItem("Alexandria_ADMIN_SECTION") + "_btn").click();
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
	$("div#menu button#logout_btn").click(function()
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
	/*==================================================
				Documents Section
	==================================================*/
	/* Add Docuemnt Section */
	$("div#documents div.uk-card-header button#add_document_btn").click(function()
	{
		$("div#documents").hide();
		$("div#add_document").show();

		/* Get All Document Types */
		var Types = getTypes();
		$("div#add_document form#add_document_form datalist#add_document_type_list").empty();
		for (var i = 0; i < Types.length; i++)
		{
			$("div#add_document form#add_document_form datalist#add_document_type_list").append("<option data-value='"+Types[i].ID+"' value='"+Types[i].NAME+"'>"+Types[i].NAME+"</option>");
		}
		/* Get All Authors */
		var Authors = getAuthors();
		$("div#add_document form#add_document_form datalist#add_document_author_list").empty();
		for (var i = 0; i < Authors.length; i++)
		{
			$("div#add_document form#add_document_form datalist#add_document_author_list").append("<option data-value='"+Authors[i].ID+"' value='"+Authors[i].NAME+"'>"+Authors[i].NAME+"</option>");
		}
		/* Get All Categories */
		var Categories = getCategories();
		$("div#add_document form#add_document_form datalist#add_document_category_list").empty();
		for (var i = 0; i < Categories.length; i++)
		{
			$("div#add_document form#add_document_form datalist#add_document_category_list").append("<option data-value='"+Categories[i].ID+"' value='"+Categories[i].NAME+"'>"+Categories[i].NAME+"</option>");
		}
		/* Set Document Type Value */
		$("div#add_document form#add_document_form input#add_document_type_label").change(function()
		{
			$("div#add_document form#add_document_form input#add_document_type").val($("div#add_document form#add_document_form datalist#add_document_type_list [value='"+$(this).val()+"']").data("value"));
		});
		/* Set Document Author Value */
		$("div#add_document form#add_document_form input#add_document_author_label").change(function()
		{
			$("div#add_document form#add_document_form input#add_document_author").val($("div#add_document form#add_document_form datalist#add_document_author_list [value='"+$(this).val()+"']").data("value"));
		});
		/* Set Document Category Value */
		$("div#add_document form#add_document_form input#add_document_category_label").change(function()
		{
			var category = $("div#add_document form#add_document_form datalist#add_document_category_list [value='"+$(this).val()+"']").data("value");
			$("div#add_document form#add_document_form input#add_document_category").val(category).trigger("change");
		});
		/* Get Subjects by Category */
		$("div#add_document form#add_document_form input#add_document_category").change(function()
		{
			var Subjects = getSubjectsByCategory();
			$("div#add_document form#add_document_form datalist#add_document_subject_list").empty();
			for (var i = 0; i < Subjects.length; i++)
			{
				$("div#add_document form#add_document_form datalist#add_document_subject_list").append("<option data-value='"+Subjects[i].ID+"' value='"+Subjects[i].NAME+"'>"+Subjects[i].NAME+"</option>");
			}
		});
		/* Set Document Subject Value */
		$("div#add_document form#add_document_form input#add_document_subject_label").change(function()
		{
			$("div#add_document form#add_document_form input#add_document_subject").val($("div#add_document form#add_document_form datalist#add_document_subject_list [value='"+$(this).val()+"']").data("value"));
		});
		/* Display Document Copies or Data Depending on the Checkbox */
		$("div#add_document div.uk-card-body form#add_document_form div#add_document_placement input").click(function()
		{
			//$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer").empty();
			if ($(this).val() == "L")
				if ($(this).is(":checked"))
					$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer").append("<div id='add_document_copies_outer' class='uk-margin'><label class='uk-form-label' for='add_document_copies'>Number of Copies</label><div class='uk-form-controls'><div class='uk-inline uk-width-1-1'><span class='uk-form-icon' uk-icon='icon: copy'></span><input id='add_document_copies' name='add_document_copies' class='uk-input' type='number' value='0' min='0' step='1' placeholder='Number of Copies' required></div></div><div class=' uk-animation-toggle'><div class='uk-animation-shake'><small id='add_document_copies_empty_error' class='error'>Please enter the Number of Copies !</small></div></div></div>");
				else
					$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer div#add_document_copies_outer").remove();
			else if ($(this).val() == "O")
				if ($(this).is(":checked"))
					$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer").append("<div id='add_document_data_outer' class='uk-margin'><label class='uk-form-label' for='add_document_data'>File</label><div class='uk-form-controls'><div class='uk-inline uk-width-1-1' uk-form-custom='target: true'><span class='uk-form-icon' uk-icon='icon: file-pdf'></span><input type='file'><input id='add_document_data' name='add_document_data' class='uk-input' type='text' value='empty' placeholder='Document File' required></div></div><div class=' uk-animation-toggle'><div class='uk-animation-shake'><small id='add_document_data_empty_error' class='error'>Please enter the Document File !</small></div></div></div>");
				else
					$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer div#add_document_data_outer").remove();
		});
	});
	/* Cofirm Add Document */
	$("div#add_document form#add_document_form button#add_document_confirm_btn").click(function(e)
	{
		/* Prevent Submission */
		e.preventDefault();
		/* Reset Add Document Form */
		resetAddDocumentForm();

		var verification = true;

		if (verification)
		{
			var AddDocumentForm = $("div#add_document form#add_document_form");
			var AddDocumentFormData = JSON.stringify(AddDocumentForm.serializeObject());
			console.log(AddDocumentFormData);
			$.ajax
			({
				url: "../php/addDocument.php",
				type: "POST",
				contentType : "application/json; charset=utf-8",
				dataType: "json",
				data: AddDocumentFormData,
			})
			.done(function(response)
			{
				switch (response.response)
				{
					case "Title_Exists":
						Notification("Failure", "Document Exists Already !");
					break;

					case true:
						Notification("Success", "Document Added Successfully !");
						/* Return to Documents Section */
						$("div#menu button#documents_btn").click();
						/* Reset Add Document Form */
						resetAddDocumentForm();
						/* Clear Add Document Form Inputs */
						$("div#add_document form#add_document_form button#add_document_reset_btn").click();
					break;

					default:
						Notification("Failure", "Oops - Something went wrong ! Please try again later !");
					break;
				}
			})
			.fail(function()
			{
				Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			});
		}
	});
	/* Return to Docuemnts Section */
	$("div#add_document div.uk-card-header button#add_document_return_btn").click(function()
	{
		$("div#add_document").hide();
		$("div#documents").show();
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
	$("div#menu button#documents_btn").click(function()
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
	$("div#menu button#librarians_btn").click(function()
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
	$("div#menu button#users_btn").click(function()
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
	$("div#menu button#seats_btn").click(function()
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
	/* When Clicking on Configuration Button in Menu */
	$("div#menu button#configuration_btn").click(function()
	{
		/* Hide All Sections */
		HideAllSections();
		/* Display Configuration Section */
		$("div#configuration").show();
		/* Make Button Active */
		$(this).addClass("active");
		/* Save Last Open Section and Open it when Refreshing */
		localStorage.setItem("Alexandria_ADMIN_SECTION", "configuration");
	});
	/* When Clicking on History Button in Menu */
	$("div#menu button#history_btn").click(function()
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
	$("div#menu button#settings_btn").click(function()
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
	$("div#add_document").hide();
	$("div#edit_document").hide();
	$("div#librarians").hide();
	$("div#users").hide();
	$("div#seats").hide();
	$("div#configuration").hide();
	$("div#history").hide();
	$("div#settings").hide();

	$("div#menu button").removeClass("active");
}
/* Get All Document Types */
function getTypes()
{
	return $.ajax
	({
		url: "../php/getTypes.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Get All Authors */
function getAuthors()
{
	return $.ajax
	({
		url: "../php/getAuthors.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
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
/* Get Subjects by Category */
function getSubjectsByCategory()
{
	return $.ajax
	({
		url: "../php/getSubjectsByCategory.php",
		type: "POST",
		dataType: "json",
		data: $("div#add_document form#add_document_form input#add_document_category").serializeObject(),
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Reset Add Document Form */
function resetAddDocumentForm()
{
	$("div#add_document form#add_document_form input").removeClass("uk-form-danger");
	$("div#add_document form#add_document_form small.error").hide();
}