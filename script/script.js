var fetchButton = document.getElementById('fetch-button');
// var apiKeyNYT = 'JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'
var dropdown = $('#selection');
var searchTerm = $('#search-input');
var search = $('.searchHistory');
var historyArray = [];

// save current search to historyArray
function buttons(event) {
  event.preventDefault();

  // Must be replaced by a Modal in future
  if (searchTerm.val()==="") {
    window.alert('Please enter a valid search');
    return;
  };

  historyArray.push(searchTerm.val());
  console.log(historyArray);

  // set searchTerm to LocalStorage
  localStorage.setItem('Book/Author', JSON.stringify(historyArray));
  historyButtons();
  getApi();
}

function historyButtons() {
  search.empty();

  for (let i = 0; i < historyArray.length; i++) {
    var rowEl = $('<div>');
    var btnEl = $('<button>').text(`${historyArray[i]}`);

    btnEl.addClass('histBtn');

    btnEl.attr('type','button');

    search.append(rowEl);
    rowEl.append(btnEl);
  }

  $('.histBtn').on("click", function (event) {
    event.preventDefault();
    search = $(this).text();
    getApi();
  })
}

fetchButton.addEventListener('click', buttons);

function getApi() {

  // create variables for constructing requestUrl
  var requestUrl = `http://openlibrary.org/search.json?${dropdown.val()}=${searchTerm.val()}`;

  // console logs for troubleshooting
  console.log(requestUrl);
  console.log(searchTerm);
  console.log(dropdown);


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data
    });

}

