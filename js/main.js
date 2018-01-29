// Listen for form Submit

document.getElementById("myForm").addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
//Get FORM values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteURL').value;

if(!validateForm(siteName, siteUrl)){
  return false;

}

var bookmark = {
    name: siteName,
    url: siteUrl

}
/* Local storage _setEscapeEvent
localStorage.setItem('test','hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/
//test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
  var bookmarks = [];
  //add to array
  bookmarks.push(bookmark);
  //set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Add bookmark to array
bookmarks.push(bookmark);
//Re-set back to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


}

//clear FORM
document.getElementById('myForm').reset();

//refetch fetchBookmarks
fetchBookmarks()


//prevent form from submitting
  e.preventDefault();
}

//delete Bookmark
function deleteBookmark(url) {
//get bookmarks from local stoarge
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarksResults
for(var i = 0; i < bookmarks.length; i++) {
  if(bookmarks[i].url == url) {
    //remove from array
    bookmarks.splice(i, 1);

  }

}
//reset back to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//refetch fetchBookmarks
fetchBookmarks()


  //Fetch bookmarks

  function fetchBookmarks() {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get Output Id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Builds Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="well">' +
                                    '<h3>' +name+
                                    '<a class="btn btn-default"  href="'+url+'">Visit </a> ' +
                                    '<a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" target="_blank" href="#" >Delete</a> ' +
                                    '</h3>'+
                                    '</div>' ;


    }
  }

function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('please use a valid url');
    return false;

  }
return true;
}
