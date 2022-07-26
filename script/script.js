var fetchButton = document.getElementById('fetch-button');
// var apiKeyNYT = 'JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'


function getApi(event) {
  event.preventDefault();

  // create variables for constructing requestUrl
  var dropdown = $('#selection').val();
  var searchTerm = $('#search-input').val();
  var requestUrl = `http://openlibrary.org/search.json?${dropdown}=${searchTerm}`;

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

      for (var i=0; i <data.length; i++) {
        var secondaryRequestUrl = 'https://api.nytimes.com/svc/books/v3//reviews.json?${lastIsbn}&${apiKeyNYT}'
        var closure = document(data[i]);
      
        fetch (secondaryRequestUrl)
        .then(function(review) {
          return review.json();
        })
        .then(closure);
      }
    });
  
}

}

// Construct Cards for search results


fetchButton.addEventListener('click', getApi);