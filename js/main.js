var SOURCE_CARDS = [
    {img: 'https://i.imgur.com/kozGuFZ.jpg', matched: false},
    {img: 'https://i.imgur.com/5BiY1Dm.jpg', matched: false},
    {img: 'https://i.imgur.com/iKGTz7W.jpg', matched: false},
    {img: 'https://i.imgur.com/RXfs2Jx.jpg', matched: false},
    {img: 'https://i.imgur.com/KmQ1yzy.jpg', matched: false},
    {img: 'https://i.imgur.com/tYGStU6.jpg', matched: false},
    {img: 'https://i.imgur.com/PXT0WdL.jpg', matched: false},
    {img: 'https://i.imgur.com/k5gfso9.jpg', matched: false},
    {img: 'https://i.imgur.com/1IsAGDl.jpg', matched: false},
    {img: 'https://i.imgur.com/WZLyW1b.jpg', matched: false}
  ];
  const CARD_BACK = 'https://i.imgur.com/YMwcs7S.png'; 
  
 
  let cards; 
  let firstCard;  
  let secondCard;
  let noMatch;
  let ignoreClicks;
  
  
  const msgEl = document.querySelector('h3');
  

  document.querySelector('main').addEventListener('click', handleChoice);
  playAgain.addEventListener('click', init);
 
  init();
  
  
  function init() {
    cards = getShuffledCards();
    firstCard = null;
    secondCard = null;
    noMatch = 0;
    ignoreClicks = false;
    render();
  }
  
  function render() {
    cards.forEach(function(card, idx) {
      const imgEl = document.getElementById(idx);
      const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
      imgEl.src = src;
    });
    msgEl.innerHTML = `Bad Count: ${noMatch}`;
  }
  
  function getShuffledCards() {
    let tempCards = [];
    let cards = [];
    for (let card of SOURCE_CARDS) {
      tempCards.push({...card}, {...card});
    }
    while (tempCards.length) {
      let rndIdx = Math.floor(Math.random() * tempCards.length);
      let card = tempCards.splice(rndIdx, 1)[0];
      cards.push(card);
    }
    return cards;
  }
  
  
  function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    if (isNaN(cardIdx) || ignoreClicks) return;
    const card = cards[cardIdx];
    if (firstCard) {
      if (secondCard) {
        if (firstCard.img === secondCard.img) {
          // correct match
          firstCard.matched = secondCard.matched = true;
        } else { 
          noMatch++;
        } 
        firstCard = null;
        secondCard = null;
      } else {
          secondCard = card;
        }   
    } else {
      firstCard = card;
    }
    render();
  }