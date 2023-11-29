const $dataViewHome = document.querySelector("[data-view='home']");
const $dataViewCardSearch = document.querySelector("[data-view='card-search']");
const $navBar = document.querySelector('.nav-bar');
const $cardSearchRow = document.querySelector('.card-search-row');
function viewSwap(nameOfView) {
  if (nameOfView === 'home') {
    $dataViewCardSearch.className = 'card-search hidden';
    $dataViewHome.className = 'home';
  } else if (nameOfView === 'card-search') {
    $dataViewHome.className = 'home hidden';
    $dataViewCardSearch.className = 'card-search';
    $navBar.className = 'row nav-bar';
  }
}

const $cardSearchButton = document.querySelector('.card-search-button');
$cardSearchButton.addEventListener('click', handleCardSearchClick);
function handleCardSearchClick(event) {
  viewSwap('card-search');
  getCardData();
}

const $homeButton = document.querySelector('#home-button');
$homeButton.addEventListener('click', handleHomeClick);
function handleHomeClick(event) {
  viewSwap('home');
}

function renderEntry(entry) {
  const $columnOneFifth = document.createElement('div');
  $columnOneFifth.setAttribute('class', 'column-one-fifth');
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.imageUrl);
  $columnOneFifth.appendChild($img);

  return $columnOneFifth;
}

function getCardData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.magicthegathering.io/v1/cards');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.cards.length; i++) {
      if (xhr.response.cards[i].imageUrl) {
        const currentRender = renderEntry(xhr.response.cards[i]);
        $cardSearchRow.appendChild(currentRender);
      }
    }
  });
  xhr.send();
}
