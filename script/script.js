var fetchButton = document.getElementById('fetch-button');
// var apiKeyNYT = 'JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'
var dropdown = $('#selection');
var searchTerm = $('#search-input');
var search = $('.searchHistory');
var historyArray = [];

// save current search to historyArray
function buttons(event) {
  event.preventDefault();
  if (searchTerm.val()==="") {
    window.alert('Please enter a valid search');
    return;
  };
  getApi();
}


fetchButton.addEventListener('click', buttons);

function getApi(event) {
  // event.preventDefault();

  // create variables for constructing requestUrl
  var requestUrl = `http://openlibrary.org/search.json?${dropdown.val()}=${searchTerm.val()}`;

  // console logs for troubleshooting
  console.log(requestUrl);
  console.log(searchTerm);
  console.log(dropdown);

//   `https://api.nytimes.com/svc/books/v3/reviews.json?${selection}=${searchTerm}&api-key=${apiKeyNYT}`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      return data
    });
}



// Set search history to Local Storage and construch buttons to be used again
function getHistory() {
  searchHistory.empty();

  for (let i=0; i<historyArray; i++) {
    var rowEl = $('<row>');
    var btnEl = $('<button>').text(`${historyArray[i]}`)
  }

}

// Construct Cards for search results


