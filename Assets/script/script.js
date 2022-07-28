var fetchButton = document.getElementById('fetch-button');
// var apiKeyNYT = 'JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'
var sellersButton = $('#best-list');
var dropdown = $('#selection');
var searchTerm = $('#search-input');
var search = $('.searchHistory');
var historyArray = [];

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// save current search to historyArray
function buttons(event) {
  event.preventDefault();

  // Must be replaced by a Modal in future


  if (searchTerm.val()==="") {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
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
    btnEl.attr('value','title');
    btnEl.attr('id', 'search-input');
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
sellersButton.click(bestSellersList);

function getApi() {

  // create variables for constructing requestUrl
  var requestUrl = `http://openlibrary.org/search.json?${dropdown.val()}=${searchTerm.val()}`;

  // console logs for troubleshooting
  console.log(requestUrl);
  console.log(searchTerm);
  console.log(dropdown);

  var repoTable = $('#repo-table');
  repoTable.empty();

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      cardsArray = data.docs;
      console.log(cardsArray);
      return cardsArray;
    })
    .then (function (results) {
      for (let i = 0; i < cardsArray.length; i++) {
        var divElCard = $('<div>');
        var rowElTitle = $('<h5>');
        rowElTitle.text(results[i].title);
        divElCard.append(rowElTitle);
        var rowElAuthor = $('<h5>');
        rowElAuthor.text('By: ' + results[i].author_name);
        divElCard.append(rowElAuthor);
        var rowElGenre = $('<h6>');
        rowElGenre.text(results[i].subject);
        divElCard.append(rowElGenre);
        var rowElDate = $('<h6>');
        rowElDate.text("Publish Date: " + results[i].first_publish_year);
        divElCard.append(rowElDate);
        console.log(results[i].isbn.length);
        var lastISBN = results[i].isbn[results[i].isbn.length-1];
        var rowElISBN = $('<a>');
        rowElISBN.attr('href', `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?${lastISBN}&api-key=JAMI5YdsgHznZkGDczFfZ6XO97pqF40P`);
        rowElISBN.text("ISBN: " + lastISBN);
        divElCard.append(rowElISBN);
        $('#repo-table').append(divElCard);
      }})
      

}

var fetchNYT = document.getElementById('fetch-review')
const apiKeyNYT = 'ogJultAYcXWwayrU1R1EQvVcAWFG70ON'

function getApi2(event2) {
  event2.preventDefault();

  var bookTitle = $('#Reveiw-request').val();
  var requestUrlNYT = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookTitle}&api-key=JAMI5YdsgHznZkGDczFfZ6XO97pqF40P`;

  console.log(requestUrlNYT);
  console.log(bookTitle);

//   `https://api.nytimes.com/svc/books/v3/reviews.json?${selection}=${searchTerm}&api-key=${apiKeyNYT}`

  fetch(requestUrlNYT)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      return data
    });
  
}
fetchNYT.addEventListener('click', getApi2);

function bestSellersList() {
    var requestUrl=  'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'
    
    var repoTable = $('#repo-table');
    repoTable.empty();

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i=0; i <data.results.books.length; i++){
        var book= data.results.books[i]
        console.log(book);
        var divEl = $('<div>');

        var rowElAuthor = $('<h5>');
        rowElAuthor.text('Author :' + book.author);
        divEl.append(rowElAuthor);
        
        var bookimage = $('<img>');
        bookimage.attr('src', book.book_image);
        bookimage.attr('style', 'width:100px');
        divEl.append(bookimage);

        
        var rowElDesc = $('<p>');
        rowElDesc.text('Description :' + book.description);
        divEl.append(rowElDesc);
        var purchaseURL = $('<a>');
        purchaseURL.text('See this book on Amazon');
        purchaseURL.attr ('href', book.amazon_product_url);
        divEl.append(purchaseURL);
        
        repoTable.append(divEl);        
      }
      return data
    })
  }