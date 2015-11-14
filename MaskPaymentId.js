// Derivative of DocumentDB Samples by Microsoft. Thus, some parts Copyright (c) Microsoft Corporation. All rights reserved.

// Register DocDB JavaScript server API for intelisense: 
//   either add the file to Tools->Options->Text Editor->JavaScript->Intellisense->References and reference the group registered 
//   or provide path to the file explicitly.
/// <reference group="Generic" />
/// <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />

/**
* This is run as stored procedure and does the following:
* - get 1st document with matching input paymentId, convert to masked version (only last 4 digits),
	then convert to masked and dashed string, finally convert to JSON, prepend string specified 
	by the prefix parameter and set response to the result of that.
*
* @param {String} prefix - The string to prepend to the 1st document in collection.
*/

function MaskPaymentData(filterQuery, paymentType)
{
	var context = getContext();
	var collection = context.getCollection();
	var response = getContext().getResponse();

	if(!filterQuery)
		var fQ = 'SELECT * FROM Users u WHERE u.paymentType = paymentType';
	else
		var fQ = filterQuery;


	function insertNthChar(string,chr,nth) {
		var o = '';
		
		for (var i=0; i<string.length; i++) {
			if (i>0 && i%4 == 0)
			{
				o += chr;
			}
		 	
		 	o += string.charAt(i);
		}

		return o;
	}

	var isAccepted = collection.queryDocuments(collection.getSelfLink(), fQ. {}. 
		function (err, results, responseOptions)
		{
			if (err) throw err;

			if (!results || !results.length)
			{
				getContext().getResponse().setBody("no results found");
			}
			else
			{
				var originalPayment = results[0];

				originalPayment.value = new Array(payment.value.length-3).join('#') + payment.value.substr(payment.value.length-4, 4);

				var output = "";

				output.value = insertNthChar(originalPayment.value, '-', 4);

				getContext().getResponse().setBody(prefix + JSON.stringify(output));
			}
		});

	if (!isAccepted) throw new Error("The query wasn't accepted by the server. Try again/use continuation token between API and script.")
}