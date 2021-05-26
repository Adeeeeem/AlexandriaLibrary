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
	/* Load Documents */
	$("div#menu button#documents_btn").click(function()
	{
		var Documents = getDocuments();
		$("div#documents div.uk-card-body table#documents_list tbody").empty();
		if (Documents != undefined)
			for (var i = 0; i < Documents.length; i++)
				$("div#documents div.uk-card-body table#documents_list tbody").append("<tr id='"+Documents[i].ID+"'><td><img class='cover' src='../img/covers/"+Documents[i].COVER+"' width='50' height='100' title='"+Documents[i].TITLE+"' alt='"+Documents[i].TITLE+"'></td><td><h6>"+Documents[i].TITLE+"</h6></td><td><h6>"+Documents[i].TYPE+"</h6></td><td><h6>"+Documents[i].SUBJECT+"</h6></td><td><h6>"+Documents[i].CATEGORY+"</h6></td><td><img class='icon view' src='../img/icons/view.png' width='25' height='25'></td><td><img class='icon edit' src='../img/icons/edit.png' width='20' height='20'></td><td><img class='icon delete' src='../img/icons/remove.png' width='20' height='20'></td></tr>");
	});
	/*==================================================
				Add Docuemnt Section
	==================================================*/
	/* Add Docuemnt */
	$("div#documents div.uk-card-header button#add_document_btn").click(function()
	{
		$("div#documents").hide();
		$("div#add_document").show();

		/* Get All Document Types */
		var Types = getTypes();
		$("div#add_document form#add_document_form datalist#add_document_type_list").empty();
		for (var i = 0; i < Types.length; i++)
			$("div#add_document form#add_document_form datalist#add_document_type_list").append("<option data-value='"+Types[i].ID+"' value='"+Types[i].NAME+"'>"+Types[i].NAME+"</option>");
		/* Get All Authors */
		var Authors = getAuthors();
		$("div#add_document form#add_document_form datalist#add_document_author_list").empty();
		for (var i = 0; i < Authors.length; i++)
			$("div#add_document form#add_document_form datalist#add_document_author_list").append("<option data-value='"+Authors[i].ID+"' value='"+Authors[i].NAME+"'>"+Authors[i].NAME+"</option>");
		/* Get All Categories */
		var Categories = getCategories();
		$("div#add_document form#add_document_form datalist#add_document_category_list").empty();
		for (var i = 0; i < Categories.length; i++)
			$("div#add_document form#add_document_form datalist#add_document_category_list").append("<option data-value='"+Categories[i].ID+"' value='"+Categories[i].NAME+"'>"+Categories[i].NAME+"</option>");
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
				$("div#add_document form#add_document_form datalist#add_document_subject_list").append("<option data-value='"+Subjects[i].ID+"' value='"+Subjects[i].NAME+"'>"+Subjects[i].NAME+"</option>");
		});
		/* Set Document Subject Value */
		$("div#add_document form#add_document_form input#add_document_subject_label").change(function()
		{
			$("div#add_document form#add_document_form input#add_document_subject").val($("div#add_document form#add_document_form datalist#add_document_subject_list [value='"+$(this).val()+"']").data("value"));
		});
		/* Display Document Copies or Data Depending on the Checkbox */
		$("div#add_document div.uk-card-body form#add_document_form div#add_document_placement input").off().click(function()
		{
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
		/* Reset Sign Up Form */
		$("div#add_document button#add_document_reset_btn").click(function(){$("div#add_document form#add_document_form")[0].reset(); resetAddDocumentForm();});
	});
	/* Cofirm Add Document */
	$("div#add_document form#add_document_form button#add_document_confirm_btn").click(function(e)
	{
		/* Prevent Submission */
		e.preventDefault();
		/* Reset Add Document Form */
		resetAddDocumentForm();
		/* Verification Variables */
		var verification_add_document_title, verification_add_document_type, verification_add_document_author, verification_add_document_category, verification_add_document_subject, verification_add_document_cover, verification_add_document_placement, verification_add_document_copies, verification_add_document_data;
		verification_add_document_title = $("div#add_document form#add_document_form input#add_document_title").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_title"), $("div#add_document form#add_document_form small#add_document_title_empty_error"));
		verification_add_document_type = $("div#add_document form#add_document_form input#add_document_type").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_type_label"), $("div#add_document form#add_document_form small#add_document_type_empty_error"));
		verification_add_document_author = $("div#add_document form#add_document_form input#add_document_author").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_author_label"), $("div#add_document form#add_document_form small#add_document_author_empty_error"));
		verification_add_document_category = $("div#add_document form#add_document_form input#add_document_category").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_category_label"), $("div#add_document form#add_document_form small#add_document_category_empty_error"));
		verification_add_document_subject = $("div#add_document form#add_document_form input#add_document_subject").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_subject_label"), $("div#add_document form#add_document_form small#add_document_subject_empty_error"));
		verification_add_document_cover = $("div#add_document form#add_document_form input#add_document_cover").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_cover"), $("div#add_document form#add_document_form small#add_document_cover_empty_error"));
		verification_add_document_placement = ( $("div#add_document form#add_document_form div#add_document_placement input#add_document_placement_library").is(":not(:checked)") && $("div#add_document form#add_document_form div#add_document_placement input#add_document_placement_online").is(":not(:checked)") ) ? $("div#add_document form#add_document_form small#add_document_placement_empty_error").show() : true;
		verification_add_document_copies = true;
		if ($("div#add_document form#add_document_form div#add_document_placement input#add_document_placement_library").is(":checked"))
			if ($("div#add_document form#add_document_form input#add_document_copies").val() == 0)
			{
				verification_add_document_copies = false;
				$("div#add_document form#add_document_form input#add_document_copies").addClass("uk-form-danger");
				$("div#add_document form#add_document_form small#add_document_copies_empty_error").show();
			}
		verification_add_document_data = true;
		if ($("div#add_document form#add_document_form div#add_document_placement input#add_document_placement_online").is(":checked"))
			verification_add_document_data = $("div#add_document form#add_document_form input#add_document_data").val().checkEmptyValue($("div#add_document form#add_document_form input#add_document_data"), $("div#add_document form#add_document_form small#add_document_data_empty_error"));

		if (verification_add_document_title && verification_add_document_type && verification_add_document_author && verification_add_document_category && verification_add_document_subject && verification_add_document_placement && verification_add_document_copies && verification_add_document_data)
		{
			var AddDocumentForm = $("div#add_document form#add_document_form");
			var AddDocumentFormData = JSON.stringify(AddDocumentForm.serializeObject());
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
						/* Remove Copies & Data Doucments */
						$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer div#add_document_copies_outer").remove();
						$("div#add_document div.uk-card-body form#add_document_form div#add_document_copies_data_outer div#add_document_data_outer").remove();
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
	/*==================================================
				View Docuemnt Section
	==================================================*/
	
	/*==================================================
				Edit Docuemnt Section
	==================================================*/
	
	/*==================================================
				Delete Docuemnt Section
	==================================================*/
	$("div#documents table#documents_list tbody").on("click", "tr td img.delete", function()
	{
		var DocumentID = $(this).parent().parent().attr("id");
		var DocumentTitle = $("div#documents table#documents_list tbody tr#"+DocumentID+" td:nth-child(2)").text();
		var DocumentType = $("div#documents table#documents_list tbody tr#"+DocumentID+" td:nth-child(3)").text();
		var Message = "Are you sure you want to delete the "+DocumentType+" \" "+DocumentTitle+" \"";
		ConfirmNotification("Failure", "Delete Document", Message, "Yes, Delete it !", "Cancel", function()
		{
			$.ajax
			({
				url: "../php/deleteDocument.php",
				type: "POST",
				dataType: "json",
				data: {DocumentID: DocumentID},
			})
			.done(function(response)
			{
				if (response.response)
				{
					Notification("Success", "Document Deleted Successfully !");
					/* Return to Documents Section */
					$("div#menu button#documents_btn").click();
				}
				else
					Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			})
			.fail(function()
			{
				Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			});
		});
	});
	/*==================================================
				Librarians Section
	==================================================*/
	/* Load Librarians */
	$("div#menu button#librarians_btn").click(function()
	{
		var Librarians = getLibrarians();
		$("div#librarians div.uk-card-body table#librarians_list tbody").empty();
		if (Librarians != undefined)
			for (var i = 0; i < Librarians.length; i++)
				$("div#librarians div.uk-card-body table#librarians_list tbody").append("<tr id='"+Librarians[i].ID+"'><td><h6>"+Librarians[i].FNAME+"</h6></td><td><h6>"+Librarians[i].LNAME+"</h6></td><td><h6>"+Librarians[i].LOGIN+"</h6></td><td><h6>"+((Librarians[i].EMAIL != null) ? Librarians[i].EMAIL : '')+"</h6></td><td><img class='icon edit' src='../img/icons/edit.png' width='20' height='20'></td><td><img class='icon delete' src='../img/icons/remove.png' width='20' height='20'></td></tr>");
	});
	/*==================================================
				Add Librarian Section
	==================================================*/
	/* Add Librarian */
	$("div#librarians div.uk-card-header button#add_librarian_btn").click(function()
	{
		$("div#librarians").hide();
		$("div#add_librarian").show();

		/* Add Librarian Display / Hide Password */
		$("div#add_librarian form#add_librarian_form input#add_librarian_password_display").click(function()
		{
			if ($(this).is(":checked"))
			{
				$("div#add_librarian form#add_librarian_form input#add_librarian_password").attr("type", "text");
				$("div#add_librarian form#add_librarian_form label#add_librarian_password_display_label").text("Hide Password");
				$("div#add_librarian form#add_librarian_form span#add_librarian_password_icon").attr("uk-icon", "icon: unlock");
			}
			else
			{
				$("div#add_librarian form#add_librarian_form input#add_librarian_password").attr("type", "password");
				$("div#add_librarian form#add_librarian_form label#add_librarian_password_display_label").text("Show Password");
				$("div#add_librarian form#add_librarian_form span#add_librarian_password_icon").attr("uk-icon", "icon: lock");
			}
		});

		/* Reset Add Librarian Form */
		$("div#add_librarian form#add_librarian_form button#add_librarian_reset_btn").click(function(){$("div#add_librarian form#add_librarian_form")[0].reset(); resetAddLibrarianForm();});
	});
	/* Cofirm Add Librarian */
	$("div#add_librarian form#add_librarian_form button#add_librarian_confirm_btn").click(function(e)
	{
		/* Prevent Submission */
		e.preventDefault();
		/* Reset Add Librarian Form */
		resetAddLibrarianForm();
		/* Verification Variables */
		var verification_add_librarian_login, verification_add_librarian_fname, verification_add_librarian_lname, verification_add_librarian_password, verification_add_librarian_repeat_password, verification_add_librarian_email;
		verification_add_librarian_login = $("div#add_librarian form#add_librarian_form input#add_librarian_login").val().checkEmptyValue($("div#add_librarian form#add_librarian_form input#add_librarian_login"), $("div#add_librarian form#add_librarian_form small#add_librarian_login_empty_error"));
		verification_add_librarian_fname = $("div#add_librarian form#add_librarian_form input#add_librarian_fname").val().checkEmptyValue($("div#add_librarian form#add_librarian_form input#add_librarian_fname"), $("div#add_librarian form#add_librarian_form small#add_librarian_fname_empty_error"));
		verification_add_librarian_lname = $("div#add_librarian form#add_librarian_form input#add_librarian_lname").val().checkEmptyValue($("div#add_librarian form#add_librarian_form input#add_librarian_lname"), $("div#add_librarian form#add_librarian_form small#add_librarian_lname_empty_error"));
		verification_add_librarian_password = $("div#add_librarian form#add_librarian_form input#add_librarian_password").val().checkEmptyValue($("div#add_librarian form#add_librarian_form input#add_librarian_password"), $("div#add_librarian form#add_librarian_form small#add_librarian_password_empty"));
		verification_add_librarian_repeat_password = $("div#add_librarian form#add_librarian_form input#add_librarian_repeat_password").val().checkPassword($("div#add_librarian form#add_librarian_form input#add_librarian_repeat_password"), $("div#add_librarian form#add_librarian_form input#add_librarian_password").val(), $("div#add_librarian form#add_librarian_form small#add_librarian_repeat_password_empty"), $("div#add_librarian form#add_librarian_form small#add_librarian_repeat_password_format"));
		if (!$("div#add_librarian form#add_librarian_form input#add_librarian_email").val().isEmpty())
			verification_add_librarian_email = $("div#add_librarian form#add_librarian_form input#add_librarian_email").val().checkFormat($("div#add_librarian form#add_librarian_form input#add_librarian_email"), /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, $("div#add_librarian form#add_librarian_form small#add_librarian_email_format"));
		else
			verification_add_librarian_email = true;

		if (verification_add_librarian_login && verification_add_librarian_fname && verification_add_librarian_lname && verification_add_librarian_password && verification_add_librarian_repeat_password && verification_add_librarian_email)
		{
			var AddLibrarianForm = $("div#add_librarian form#add_librarian_form");
			var AddLibrarianFormData = JSON.stringify(AddLibrarianForm.serializeObject());

			$.ajax
			({
				url: "../php/addLibrarian.php",
				type: "POST",
				contentType : "application/json; charset=utf-8",
				dataType: "json",
				data: AddLibrarianFormData,
			})
			.done(function(response)
			{
				switch (response.response)
				{
					case "Login_Exists":
						Notification("Failure", "Username Already Exists ! Please try another Username !");
						$("div#add_librarian input#add_librarian_login").addClass("uk-form-danger");
						$("div#add_librarian small#add_librarian_login_exists").show();
					break;

					case "Email_Exists":
						Notification("Failure", "Email Already Exists ! Please try another Email Address !");
						$("div#add_librarian input#add_librarian_email").addClass("uk-form-danger");
						$("div#add_librarian small#add_librarian_email_exists").show();
					break;

					case true:
						Notification("Success", "Librarian Added Successfully !");
						/* Return to Librarians Section */
						$("div#menu button#librarians_btn").click();
						/* Reset Add Librarian Form */
						resetAddLibrarianForm();
						/* Clear Add Librarian Form Inputs */
						$("div#add_librarian form#add_librarian_form button#add_librarian_reset_btn").click();
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
	/* Return to Librarians Section */
	$("div#add_librarian div.uk-card-header button#add_librarian_return_btn").click(function()
	{
		$("div#add_librarian").hide();
		$("div#librarians").show();
	});
	/*==================================================
				Edit Librarian Section
	==================================================*/
	
	/*==================================================
				Delete Librarian Section
	==================================================*/
	$("div#librarians table#librarians_list tbody").on("click", "tr td img.delete", function()
	{
		var LibrarianID = $(this).parent().parent().attr("id");
		var LibrarianName = $("div#librarians table#librarians_list tbody tr#"+LibrarianID+" td:nth-child(2)").text() + " " + $("div#librarians table#librarians_list tbody tr#"+LibrarianID+" td:nth-child(3)").text();
		var Message = "Are you sure you want to delete the Librarian \" "+LibrarianName+" \"";
		ConfirmNotification("Failure", "Delete Librarian", Message, "Yes, Delete it !", "Cancel", function()
		{
			$.ajax
			({
				url: "../php/deleteLibrarian.php",
				type: "POST",
				dataType: "json",
				data: {LibrarianID: LibrarianID},
			})
			.done(function(response)
			{
				if (response.response)
				{
					Notification("Success", "Librarian Deleted Successfully !");
					/* Return to Documents Section */
					$("div#menu button#librarians_btn").click();
				}
				else
					Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			})
			.fail(function()
			{
				Notification("Failure", "Oops - Something went wrong ! Please try again later !");
			});
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
	$("div#add_librarian").hide();
	$("div#users").hide();
	$("div#seats").hide();
	$("div#configuration").hide();
	$("div#history").hide();
	$("div#settings").hide();

	$("div#menu button").removeClass("active");
}
/* Get All Documents */
function getDocuments()
{
	return $.ajax
	({
		url: "../php/getDocuments.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
}
/* Get All Librarians */
function getLibrarians()
{
	return $.ajax
	({
		url: "../php/getLibrarians.php",
		type: "POST",
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {},
		async: false,
		error: function (error) {console.log(error);}
	}).responseJSON;
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
/* Reset Add Document Form */
function resetAddLibrarianForm()
{
	$("div#add_librarian form#add_librarian_form input").removeClass("uk-form-danger");
	$("div#add_librarian form#add_librarian_form small.error").hide();
	/* Reset Show Password Button */
	$("div#add_librarian form#add_librarian_form input#add_librarian_password").attr("type", "password");
	$("div#add_librarian form#add_librarian_form label#add_librarian_password_display_label").text("Show Password");
	$("div#add_librarian form#add_librarian_form span#add_librarian_password_icon").attr("uk-icon", "icon: lock");
}