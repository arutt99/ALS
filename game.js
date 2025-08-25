const initialDeck = [
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

let gameState = {};

function initializeGame() {
    gameState = {
        deck: [...initialDeck],
        player1Hand: [],
        player2Hand: [],
        drawPile: [],
        theaters: {
            air: { player1: [], player2: [] },
            land: { player1: [], player2: [] },
            sea: { player1: [], player2: [] }
        },
        activePlayer: 1,
        selectedCard: null,
        player1Vp: 0,
        player2Vp: 0
    };
    shuffle(gameState.deck);
    const { player1Hand, player2Hand, drawPile } = deal(gameState.deck);
    gameState.player1Hand = player1Hand;
    gameState.player2Hand = player2Hand;
    gameState.drawPile = drawPile;
    renderGame();
}

function shuffle(deck) {
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

function selectCard(card, index) {
    if (gameState.activePlayer !== 1) return; // Only player 1 can select cards for now
    gameState.selectedCard = { ...card, index };
    renderGame();
}

function renderGame() {
    // Visual feedback for improvising mode
    document.body.classList.toggle('improvising', gameState.isImprovising);

    // Render hands
    renderHand(gameState.player1Hand, document.querySelector('.player-1-hand'), true, true);
    renderHand(gameState.player2Hand, document.querySelector('.player-2-hand'), false, false);

    // Render theaters
    for (const theaterId in gameState.theaters) {
        const theater = gameState.theaters[theaterId];
        renderTheater(theater.player1, document.querySelector(`#${theaterId}-theater .player-1-side`), true);
        renderTheater(theater.player2, document.querySelector(`#${theaterId}-theater .player-2-side`), false);
    }

    // Render draw pile
    const deckHolderContainer = document.querySelector('.deck-holder');
    deckHolderContainer.innerHTML = '';
    if (gameState.drawPile.length > 0) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = 'assets/card_back.png';
        cardElement.appendChild(cardImage);
        deckHolderContainer.appendChild(cardElement);
    }

    // Show/hide action buttons
    const actionButtons = document.getElementById('action-buttons');
    if (gameState.selectedCard) {
        actionButtons.classList.add('visible');
    } else {
        actionButtons.classList.remove('visible');
    }
}

function renderHand(hand, container, isFaceUp, isPlayer1) {
    container.innerHTML = '';
    hand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (gameState.selectedCard && gameState.selectedCard.id === card.id) {
            cardElement.classList.add('selected');
        }

        const cardImage = document.createElement('img');
        cardImage.src = isFaceUp ? card.image : 'assets/card_back.png';
        cardElement.appendChild(cardImage);

        if (isPlayer1 && isFaceUp) {
            cardElement.addEventListener('click', () => {
                selectCard(card, index);
            });
        }

        container.appendChild(cardElement);
    });
}

function renderTheater(cards, container, isPlayer1) {
    container.innerHTML = '';
    for (const card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.src = card.isFaceDown ? 'assets/card_back.png' : card.image;
        cardElement.appendChild(cardImage);
        container.appendChild(cardElement);
    }
}

function cleanup() {
    const player1HandContainer = document.querySelector('.player-1-hand');
    const player2HandContainer = document.querySelector('.player-2-hand');
    const deckHolderContainer = document.querySelector('.deck-holder');

    // Clear hands
    player1HandContainer.innerHTML = '';
    player2HandContainer.innerHTML = '';

    // Clear theaters
    for (const theaterId in gameState.theaters) {
        document.querySelector(`#${theaterId}-theater .player-1-side`).innerHTML = '';
        document.querySelector(`#${theaterId}-theater .player-2-side`).innerHTML = '';
    }

    // Display a single card in the deck holder to represent the full deck
    deckHolderContainer.innerHTML = '';
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.src = 'assets/card_back.png';
    cardElement.appendChild(cardImage);
    deckHolderContainer.appendChild(cardElement);
}

function deployCard() {
    const { selectedCard, activePlayer } = gameState;
    if (!selectedCard) return;

    const theaterId = selectedCard.type.toLowerCase();
    const player = `player${activePlayer}`;

    // Add card to theater
    gameState.theaters[theaterId][player].push(selectedCard);

    // Remove card from hand
    gameState.player1Hand.splice(selectedCard.index, 1);

    // Clear selected card
    gameState.selectedCard = null;

    renderGame();
}

function improviseCard() {
    if (!gameState.selectedCard) return;
    gameState.isImprovising = true;
    // Maybe add some visual feedback to show that we are in improvising mode
    console.log('Select a theater to improvise...');
}

function handleTheaterClick(theaterId) {
    if (!gameState.isImprovising || !gameState.selectedCard) return;

    const { selectedCard, activePlayer } = gameState;
    const player = `player${activePlayer}`;

    const improvisedCard = {
        ...selectedCard,
        isFaceDown: true,
        strength: 2
    };

    // Add card to theater
    gameState.theaters[theaterId][player].push(improvisedCard);

    // Remove card from hand
    gameState.player1Hand.splice(selectedCard.index, 1);

    // Reset state
    gameState.selectedCard = null;
    gameState.isImprovising = false;

    renderGame();
}

document.addEventListener('DOMContentLoaded', () => {
    const dealBtn = document.getElementById('deal-btn');
    const cleanupBtn = document.getElementById('cleanup-btn');
    const deployBtn = document.getElementById('deploy-btn');
    const improviseBtn = document.getElementById('improvise-btn');

    dealBtn.addEventListener('click', () => {
        initializeGame();
    });

    cleanupBtn.addEventListener('click', () => {
        cleanup();
        initializeGame();
    });

    deployBtn.addEventListener('click', deployCard);
    improviseBtn.addEventListener('click', improviseCard);

    document.querySelectorAll('.theater').forEach(theater => {
        theater.addEventListener('click', () => handleTheaterClick(theater.id.replace('-theater', '')));
    });

    initializeGame();
});
