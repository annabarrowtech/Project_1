var fetchButton = document.getElementById('fetch-button');

function getApi() {
  var requestUrl = 'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=JAMI5YdsgHznZkGDczFfZ6XO97pqF40P'
//   'http://openlibrary.org/search.json?title=the+lord+of+the+rings'

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
}

fetchButton.addEventListener('click', getApi);