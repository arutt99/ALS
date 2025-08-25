const deck = [
    { id: 1, name: 'Support', type: 'Air', strength: 1, tacticalAbility: 'You gain +3 strength in each adjacent theater.', abilityType: 'Ongoing', image: 'assets/air_1.png' },
    { id: 2, name: 'Air Drop', type: 'Air', strength: 2, tacticalAbility: 'On your next turn, you may play a card to a non-matching theater.', abilityType: 'Instant', image: 'assets/air_2.png' },
    { id: 3, name: 'Maneuver', type: 'Air', strength: 3, tacticalAbility: 'FLIP a card in an adjacent theater.', abilityType: 'Instant', image: 'assets/air_3.png' },
    { id: 4, name: 'Aerodrome', type: 'Air', strength: 4, tacticalAbility: 'You may play cards of strength 3 or less to non-matching theaters.', abilityType: 'Ongoing', image: 'assets/air_4.png' },
    { id: 5, name: 'Containment', type: 'Air', strength: 5, tacticalAbility: 'If either player plays a card facedown, DISCARD that card with no effect.', abilityType: 'Ongoing', image: 'assets/air_5.png' },
    { id: 6, name: 'Heavy Bombers', type: 'Air', strength: 6, tacticalAbility: 'None', abilityType: 'None', image: 'assets/air_6.png' },
    { id: 7, name: 'Reinforce', type: 'Land', strength: 1, tacticalAbility: 'Look at the top card of the deck. You may play it facedown to an adjacent theater.', abilityType: 'Instant', image: 'assets/land_1.png' },
    { id: 8, name: 'Ambush', type: 'Land', strength: 2, tacticalAbility: 'FLIP a card in any theater.', abilityType: 'Instant', image: 'assets/land_2.png' },
    { id: 9, name: 'Maneuver', type: 'Land', strength: 3, tacticalAbility: 'FLIP a card in an adjacent theater.', abilityType: 'Instant', image: 'assets/land_3.png' },
    { id: 10, name: 'Cover Fire', type: 'Land', strength: 4, tacticalAbility: 'All cards COVERED by this card are now strength 4.', abilityType: 'Ongoing', image: 'assets/land_4.png' },
    { id: 11, name: 'Disrupt', type: 'Land', strength: 5, tacticalAbility: 'Your opponent chooses and FLIPS 1 of their cards. Then you FLIP 1 of yours.', abilityType: 'Instant', image: 'assets/land_5.png' },
    { id: 12, name: 'Heavy Tanks', type: 'Land', strength: 6, tacticalAbility: 'None', abilityType: 'None', image: 'assets/land_6.png' },
    { id: 13, name: 'Transport', type: 'Sea', strength: 1, tacticalAbility: 'You may MOVE 1 of your cards to a different theater.', abilityType: 'Instant', image: 'assets/sea_1.png' },
    { id: 14, name: 'Escalation', type: 'Sea', strength: 2, tacticalAbility: 'All of your facedown cards are now strength 4.', abilityType: 'Ongoing', image: 'assets/sea_2.png' },
    { id: 15, name: 'Maneuver', type: 'Sea', strength: 3, tacticalAbility: 'FLIP a card in an adjacent theater.', abilityType: 'Instant', image: 'assets/sea_3.png' },
    { id: 16, name: 'Redeploy', type: 'Sea', strength: 4, tacticalAbility: 'Return 1 of your facedown cards to your hand. If you do, gain an extra turn.', abilityType: 'Instant', image: 'assets/sea_4.png' },
    { id: 17, name: 'Blockade', type: 'Sea', strength: 5, tacticalAbility: 'If a card is played in an adjacent theater with 3 or more cards already in it (counting both players\' cards), DISCARD that card with no effect.', abilityType: 'Ongoing', image: 'assets/sea_5.png' },
    { id: 18, name: 'Battleship', type: 'Sea', strength: 6, tacticalAbility: 'None', abilityType: 'None', image: 'assets/sea_6.png' }
];

function shuffle(deck) {
    // Fisher-Yates shuffle algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function deal(deck) {
    const player1Hand = deck.slice(0, 6);
    const player2Hand = deck.slice(6, 12);
    const drawPile = deck.slice(12);
    return { player1Hand, player2Hand, drawPile };
}

function displayHands(player1Hand, player2Hand, drawPile) {
    const player1HandContainer = document.querySelector('.player-1-hand');
    const player2HandContainer = document.querySelector('.player-2-hand');
    const deckHolderContainer = document.querySelector('.deck-holder');

    // Clear existing cards
    player1HandContainer.innerHTML = '';
    player2HandContainer.innerHTML = '';
    deckHolderContainer.innerHTML = '';

    // Display Player 1's hand (face up)
    for (const card of player1Hand) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardElement.appendChild(cardImage);
        player1HandContainer.appendChild(cardElement);
    }

    // Display Player 2's hand (face down)
    for (const card of player2Hand) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = 'assets/card_back.png';
        cardElement.appendChild(cardImage);
        player2HandContainer.appendChild(cardElement);
    }

    // Display draw pile in deck holder
    if (drawPile && drawPile.length > 0) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = 'assets/card_back.png';
        cardElement.appendChild(cardImage);
        deckHolderContainer.appendChild(cardElement);
    }
}

function cleanup() {
    const player1HandContainer = document.querySelector('.player-1-hand');
    const player2HandContainer = document.querySelector('.player-2-hand');
    const deckHolderContainer = document.querySelector('.deck-holder');

    // Clear hands
    player1HandContainer.innerHTML = '';
    player2HandContainer.innerHTML = '';

    // Display a single card in the deck holder to represent the full deck
    deckHolderContainer.innerHTML = '';
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.src = 'assets/card_back.png';
    cardElement.appendChild(cardImage);
    deckHolderContainer.appendChild(cardElement);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial state: all cards in deck
    cleanup();

    const dealBtn = document.getElementById('deal-btn');
    const cleanupBtn = document.getElementById('cleanup-btn');

    dealBtn.addEventListener('click', () => {
        shuffle(deck);
        const { player1Hand, player2Hand, drawPile } = deal(deck);
        displayHands(player1Hand, player2Hand, drawPile);
    });

    cleanupBtn.addEventListener('click', () => {
        cleanup();
    });
});
