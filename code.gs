function createFormSubmitTrigger() {

  // Get the form object
  var form = FormApp.getActiveForm();

  // See if the trigger has already been set up.
  // The trigger is already set up so there is not needing to check and recreate
  var currentTriggers = ScriptApp.getProjectTriggers();
  if (currentTriggers.length > 0)
    return;

  // Create a trigger that will run the onFormSubmit function
  // whenever the form is submitted.
  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
}


// --------------


function onFormSubmit(e) {
  // get the response submitted
  var formResponse = e.response;
  // insert recipients names
  var recipientsTO = "email@gmail.com";
  // get the items (i.e., responses to various questions)
  var itemResponses = formResponse.getItemResponses();
  
  // create the html Body
  var htmlBody = HtmlService.createTemplateFromFile('mail_template');
  htmlBody.name = itemResponses[0].getResponse();
  htmlBody.surname = itemResponses[1].getResponse();
  htmlBody.matricola = itemResponses[2].getResponse();
  htmlBody.note = itemResponses[3].getResponse();
  var email_html = htmlBody.evaluate().getContent();

 // create the subject for the email
  var subjects = "Subject of the email " + htmlBody.surname + " " + htmlBody.name;
  MailApp.sendEmail({to:recipientsTO, subject: subjects,htmlBody: email_html});

}





