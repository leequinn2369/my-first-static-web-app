//The URIs of the REST endpoint
VUPS = "https://prod-63.northeurope.logic.azure.com:443/workflows/bc5a10057f7b4e86a1ee699ba37d4fbe/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JoagicqRDF6KsFKI86R5-jhoytu16wWWAapwSWnprSw";
RAI = "https://prod-31.northeurope.logic.azure.com:443/workflows/9f0fc74a173945088ecb70152cda40cd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9nOa_DoL0hmSdNVu7EppDEinguf9wLWD8G32jCjH0ZU";


BLOB_ACCOUNT = "https://videoshareb00839682.blob.core.windows.net";

D1 = "https://prod-14.centralus.logic.azure.com/workflows/d508f86f7c9e4008a71bdbba4cc1d47d/triggers/manual/paths/invoke/rest/v1/assets/"
D2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q5uvdLbvXNFV9OHfQjX4v2eKki8DORfuTBebWFXN2Hg"

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}



//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('videoID', $('#videoID').val());
 submitData.append('videoName', $('#videoName').val());
 submitData.append('rating', $('#rating').val());
 submitData.append('genre', $('#genre').val());
 submitData.append('publisher', $('#publisher').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: VUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });
}




function getImages(){
//Replace the current HTML in that div with a loading message
$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
items.push( "<hr />");
items.push("<video controls> <source type = 'video/mp4' src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />></video>")
items.push( "File : " + val["fileName"] + "<br />");
items.push( "Video Title : " + val["videoName"] + "<br />");
items.push( "Video ID : " + val["videoID"] + "<br />");
items.push( "Uploaded by: " + val["publisher"] + " (publisher: "+val["publisher"]+")<br />");
items.push( "Genre: " + val["genre"] + "<b> rating</b>:" +val["rating"] + "<br />");
items.push('<button type="button" id="btnDelete" class="btndeletevideo" onclick="videoRemove(\''+val["id"] +'\')">Delete</button>')
items.push( "<hr />");
});


//Clear the assetlist div
$('#ImageList').empty();
//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#ImageList" );
});

}

function videoRemove (id) {
  $.ajax({
    type: "DELETE",
    url: D1 + id + D2,
  }).done(function( msg){
    getImages();
  })
}




//A function to get a list of all the assets and write them to the Div with the AssetList Div

 

