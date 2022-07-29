var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var isbn = getUrlParameter('isbn');
console.log(isbn);
var nytURL= 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?${isbn}&api-key=ogJultAYcXWwayrU1R1EQvVcAWFG70ON';
    console.log(nytURL);

    var repoTable = $('#repo-table');
    repoTable.empty();

    fetch(nytURL)     
        .then(function (response) {
        console.log(response.status);
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

    });

      
      
    
  
      