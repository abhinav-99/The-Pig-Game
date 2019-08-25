var scores, roundScore, activePlayer, dice, player1, player2, gamePlaying, previous;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying){
	var dice = Math.floor(Math.random() * 6) + 1;
	
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	if(dice === 6 && previous === 6){
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = '0';
		nextPlayer();	
	}
	else if(dice > 1){
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		nextPlayer();
	}
	previous = dice;
	}
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
	scores[activePlayer] += roundScore;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	var input = document.querySelector('.final-score').value;
	var winningScore;

	if(input) {
		winningScore = input;
	} else {
		winningScore = 100;
	}
	
	if(scores[activePlayer] >= winningScore) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('#name-' + (activePlayer^1)).textContent = 'Chuttad!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	}else {
		nextPlayer();
	}
	}	
});

function nextPlayer() {
		activePlayer ^= 1;
		roundScore = 0;
	
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	
	player1 = prompt('Enter name of Player 1');
	player2 = prompt('Enter name of Player 2');

	document.querySelector('#name-0').textContent = player1;
	document.querySelector('#name-1').textContent = player2;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}