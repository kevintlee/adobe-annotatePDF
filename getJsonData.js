
// getJsonData.js
// -----------------------------------------------------------------------
// >>Adobe Acrobat Extension
// Function that makes a HTTP Request and is able to parse the JSON message 
// Tested: setInterval() does not work in folder-level script
//
// Author: Kevin T. Lee
// **Tested in Adobe Acrobat 11.0 
// -----------------------------------------------------------------------



//Put in document-level - calls getJsonData()
//app.setInterval(getJsonData(), 10000);

//var doc = app.openDoc("[PDFPATH]");


var getJsonData = app.trustedFunction(function (){
	app.beginPriv();

	//Debugging statements
	console.println("getJsonData hit" + foo.count++);
	
	// Net HTTP Request -- returns a JSON Stream Object, parsed by eval()
	Net.HTTP.request({
		cVerb: 'GET',
		cURL: 'http://earthquake-report.com/feeds/recent-eq?json',
		oHandler: 
		{
			response : function(msg){
				var stream = msg;
				string = SOAP.stringFromStream(stream);

				// eval() -- parses JSON 
				// use objJSON to access data 
				var objJSON = eval("(function(){return " + string + ";})()");

				for(var i = 0; i < objJSON.length; i++){
					console.println(objJSON[i].title);
				}
			}
		}
	});

	//Formatting for console, [readability code]
	console.println("");


	app.endPriv();
});


// Once Adobe Acrobat is started, this method is called. 
foo = app.setInterval("getJsonData();", 10000);
foo.count = 0;




app.addMenuItem(  
{  
cName: "-",              // menu divider  
cParent: "View",         // append to the View menu    
cExec: "void(0);" 
} ); 

app.addMenuItem(  
{  
cName: "Get JSON Data",             
cParent: "View",         // append to the View menu  
cExec: "testMe();"  
} );  


