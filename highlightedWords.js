
// highlightedWords.js
// -------------------------------------------------------------------------------------------------
// Performs several functions that deals with annotations and quads on a PDF.

// Functions:
//  getAllQuads() - gets all coordinates of the words in the document
//  getHighlightedWords() - scans document for highlighted words (highlight annotation), 
//                          returns highlighted word
//  makeAnnotationFromQuad() - makes annotation from quad (hard-coded example)
//  highlightUserSpecified() - user inputs quad of word to highlight, highlights word (user specified example)
//  getPageNum() - returns current page number   
//  getAnnotations() - gets highlighted annotations in the document, uses getHighlightedWords()
//   
// Author: Kevin T. Lee
// **Tested in Adobe Acrobat 11.0 
// ------------------------------------------------------------------------------------------------


//Opens doc, allows a reference in which to call methods on the open doc
// var doc = app.openDoc("[PATH]");



//Gets all Quads of words in the document
var allQuads = new Array();
var pdfPath = ""; //Set path here

function getAllQuads(){
  //var doc = app.openDoc("C:/Documents/User/Using The Authorized Installation Utility.pdf");
  var doc = app.openDoc(pdfPath);
  console.println("numpages" + doc.numPages);

  for(var pageNum = 0; pageNum < doc.numPages; pageNum++){
    for(var i = 0; i < doc.getPageNumWords(pageNum); i++){
      
      //var nthWord = doc.getPageNthWord(pageNum, i);
      var q = doc.getPageNthWordQuads(pageNum, i);
      var qArray = q[0];

      allQuads[i] = [qArray];
      //console.println("success");
    }
  }

  console.println("Finished getting all Quads");

  // for (var x = 0; x < allQuads.length; x++) {
  //   console.println(x + ": " + allQuads[x]);
  // }

  
}


// Gets all highlighted annotations in PDF 
var highlightedWords = new Array();
function getHighlightedWords(annot, pagenumber) {
      //var doc = app.openDoc("C:/Users/ktl29155/Downloads/svn-refcard.pdf");
      var doc = app.openDoc(pdfPath);

      //var pageNumWords = doc.getPageNumWords(pagenumber);
      //console.println("Number of words on page " + pageNumWords);

      var annotQuads = annot.quads[0];

     
      // console.println(doc.getPageNumWords(pagenumber)); //prints 801, num words in svn-refcard.pdf
      //console.println("Javascript: " + annotQuads); 
      //annotQuadString = annotQuads[0].toString();
      //console.println(annotQuadString);
      

      // test every word on the page
      for (var i = 0; i < doc.getPageNumWords(pagenumber); i++) {
              var q = doc.getPageNthWordQuads(pagenumber, i);
              var qArray = q[0];
              //console.println("qArray: " + [qArray]);

              aQ1 = annotQuads[0].toString();
              aQ2 = annotQuads[1].toString();
              q1 = qArray[0].toString();
              q2 = qArray[1].toString();

              v1 = parseInt(aQ1);
              v2 = parseInt(aQ2);
              v3 = parseInt(q1);
              v4 = parseInt(q2);

              if(v1 == v3 && v2 == v4){
                var quadArray = doc.getPageNthWordQuads(pagenumber,i);
                console.println(quadArray[0]);
                highlightedWords.push(doc.getPageNthWord(pagenumber, i));
              }
      }

      for (var i = 0; i < highlightedWords.length; i++){
        console.println("Highlighted Word #" + (i+1) + ": " + highlightedWords[i]);
      }

      console.println("");
}

//Creates annotation given quads -hard coded
function makeAnnotationFromQuad(){

  var arry = new Array();

  //reference
  // arry[0] = [407.77801513671875,458.2439880371094,504.6159973144531,458.2439880371094,407.77801513671875,425.3399963378906,504.6159973144531,425.3399963378906];
  
  //javascript
  // arry[1] = [122.69999694824219,458.2439880371094,
  //     214.45199584960938,458.2439880371094,
  //     122.69999694824219,425.3399963378906,
  //     214.45199584960938,425.3399963378906];

  //for
  arry[0] = [72,721.1661376953125,109.518310546875,721.1661376953125,72,705.84375,109.518310546875,705.84375];

  // var annot = this.addAnnot({
  //   page: 0,
  //   type: "Highlight",
  //   quads: arry,
  //   author: "Kevin-Testing",
  //   contents: "2 quads within 1 annotation"
  // });

   var annot = this.addAnnot({
    page: 0,
    type: "Highlight",
    quads: arry,
    author: "Tester",
    contents: "firstAnnot-Council Highlighted"
  });
}


// Highlights quad specified by the user
function highlightUserSpecified(){



  var userSpecifiedArray = new Array();
  var newArray = new Array();

  //Quads for word "For" --word Quad
  //236.90859985351562,458.2436828613281,265.9341125488281,458.2436828613281,236.90859985351562,425.3403625488281,265.9341125488281,425.3403625488281

  //Quads for wod "Reference" -- annotation Quad
  //407.77801513671875,458.2439880371094,504.6159973144531,458.2439880371094,407.77801513671875,425.3399963378906,504.6159973144531,425.3399963378906

  //Quads for word "Contents" on page 3 
  //107.46000671386719,727.82373046875,187.44012451171875,727.82373046875,107.46000671386719,698.7603149414062,187.44012451171875,698.7603149414062

  var userSpecified = null;
  var userSpecifiedPage = null;

  
  userSpecified = app.response("What are the quad coordinates?");
  
  userSpecifiedPage = app.response("What is the page number");

  parsedUserPage = parseInt(userSpecifiedPage)-1;

  userSpecifiedSplit = userSpecified.split(",");

  for(var i = 0; i < userSpecifiedSplit.length; i++){
    var parsedFloat = parseFloat(userSpecifiedSplit[i]);
    newArray[i] = parsedFloat;
  }

  
  userSpecifiedArray[0] = [newArray[0],newArray[1],newArray[2],newArray[3],newArray[4],newArray[5],newArray[6],newArray[7]];
  
  console.println(userSpecifiedArray[0]);
  
  var annot = this.addAnnot({
    page: parsedUserPage, //need to specificy which page the quad coordinates apply to
    type: "Highlight",
    quads: userSpecifiedArray,
    author: "User",
    contents: "userspecifiedArray"
  });

}

// Test the function:
// Note that this test assumes there is at least one
// annotation on the current page:
// var annots = this.getAnnots({ nPage:0 });
// var pageAnnots = app.getAnnots();
// var firstAnnot = annots[0];
// var words = getHighlightedWords( firstAnnot, page );
// alert("The highlighted text is " + words);

function getPageNum(){
   var pageIndex = this.pageNum; //index starts at [0], 
   var pageNum = (pageIndex + 1);
   app.alert("Page Index: " + pageIndex + "\nPage Number: " + pageNum);
} 

// Gets annotations from the PDF, uses getHighlightedWords() to get the highlighted annotations
function getAnnotations(){
  //var doc = app.openDoc("C:/Users/ktl29155/Downloads/svn-refcard.pdf");
  var pageIndex = this.pageNum;
  var annots = this.getAnnots({nPage:pageIndex});

  console.println(pageIndex);


  //console.println("\nAnnot Report for document: " + this.documentFileName);
  //console.println("");
  //console.println("Get Highlighted Word Executed");
  
  //Calls getHighlightedWords(annotation, pageNumber), to print the highlighted words, selected words
  //getHighlightedWords(annots[0], pageIndex);
  for (var i=0; i < annots.length; i++){
    console.println(annots[i]);
     getHighlightedWords(annots[i], pageIndex);
  }
  
  //app.alert("Highlighted words: " + words);

  if ( annots != null ) {
    console.show();
    app.alert("Number of Annotations: " + annots.length);

    //console.println("Number of Annotations: " + annots.length);

    //var msg = "   %s in a %s annot said: \"%s\"";

    // for (var i = 0; i < annots.length; i++){
    //  app.alert("" + annots[i]);
    // }

  } else
    console.println("    No annotations in this document.");
}



// Adding items to the menu
app.addMenuItem(  
{  
cName: "-",              // menu divider  
cParent: "View",         // append to the View menu    
cExec: "void(0);" 
} ); 

app.addMenuItem(  
{  
cName: "Get Page Number",             
cParent: "View",         // append to the View menu  
cExec: "getPageNum();"  
} );  

app.addMenuItem(  
{  
cName: "Get Highlighted",             
cParent: "View",         // append to the View menu  
cExec: "getAnnotations();"  
} );  


app.addMenuItem(  
{  
cName: "Make Annotation",             
cParent: "View",         // append to the View menu  
cExec: "makeAnnotationFromQuad();"  
} );  

app.addMenuItem(
{
  cName: "Get All Quads",
  cParent: "View",
  cExec: "getAllQuads();"
});

app.addMenuItem(
{
  cName: "highlightUserSpecified",
  cParent: "View",
  cExec: "highlightUserSpecified();"
});

