// Display Books
export const displayBooksForGoogle = (image, title, author, price, source) => {
  const booksPlaceHolder = document.querySelector('#googlebook');
  console.log('Working ...');
  const HTML = `
    <div class='container'>
    <div class='center list flex-column'>
      <div class='card flex-row open'>
        <img src='${image}' class='book'>
        <div class='flex-column info'>
          <div class='title'>${title}</div>
          <div class='author'>${author}</div>
        </div>
        <div class='flex-column group'>
          <div class='members'>
           
            <span class='max'>${source}</span>
          </div>
          <div class='hidden bottom'>
            <button class='simple'>${price}</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  booksPlaceHolder.innerHTML = HTML;
};

export const displayBooksForITBooks = (image, title, price, source) => {
  const booksPlaceHolder = document.querySelector('#itbook');
  console.log('Working ...');
  const HTML = `
      <div class='container'>
      <div class='center list flex-column'>
        <div class='card flex-row open'>
          <img src='${image}' class='book'>
          <div class='flex-column info'>
            <div class='title'>${title}</div>
          </div>
          <div class='flex-column group'>
            <div class='members'>
             
              <span class='max'>${source}</span>
            </div>
            <div class='hidden bottom'>
              <button class='simple'>${price}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  booksPlaceHolder.innerHTML = HTML;
};
