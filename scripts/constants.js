let g = 0.08; //default gravity
let e = 0.8; //default elasticity
let playMode = 'free_play'; //default play mode
let maximumPossibleScore = 15; //maximum points that can be earned
let totalNumberOfRounds = 3; //number of rounds to decide who wins in case of multiplayer
let e_x = Math.min(e * 1.1, 0.99); //e effect on horizontal velocity when ball touch on vertical edges
let numberOfPlayers = 1;

const maxNumberOfMultiplayer = 6;
const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;
const frameRate = 10; // 1 frame / (frameRate) ms
let currentScore = 0;
let highestScore = 0;
let numberOfRoundsPassed = 0;

let intervalId;
let timeoutId;
let isMouseDown = false;
let isLongClick = false;
let isPlaygroundDisabled = true;

let currentSelectedPlayer = 'none';
let scoresArray = [];
let currentScores = [];

const ARRAY_FOR_ITERATION = (n = 0) => Array.from({ length: n }, (_, index) => index);

const PLAYER_COLOR_MAPPING = {
	one: '#8cd521',
	two: '#e3692c',
	three: '#6a29cc',
	four: '#d572d5',
	five: '#8bbcf7',
	six: '#f3d66b',
	cpu: '#e3692c',
	none: '',
};

const getToastProps = () => {
	const color = PLAYER_COLOR_MAPPING[currentSelectedPlayer];
	switch(currentSelectedPlayer) {
		case 'cpu' : return ['CPU', color];
		case 'none' : return ['Free Play', color];
		default : return [PLAYER_NAME_LABEL_MAPPING[currentSelectedPlayer], color];
	}
}

const FREE_PLAY = 'free_play';
const MULTIPLAYER = 'multiplayer';
const ONE_VS_CPU = '1_vs_cpu';

const PLAY_MODE_OPTIONS = [
	{
		label: 'Free Play',
		value: FREE_PLAY,
	},
	{
		label: 'Multiplayer',
		value: MULTIPLAYER,
	},
	{
		label: '1 vs CPU',
		value: ONE_VS_CPU,
	},
];

const INITIAL_TURN_MAPPING = {
	[FREE_PLAY]: 'none',
	[MULTIPLAYER]: 'one',
	[ONE_VS_CPU]: 'one',
}

let PLAYER_NAME_LABEL_MAPPING = {
	cpu: 'CPU',
	one: '',
	two: '',
	three: '',
	four: '',
	five: '',
	six: '',
};

const NUM_TO_WORD_MAPPING = {
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
};

const WORD_TO_NUM_MAPPING = {
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
};

const WIN_TEXT_MAPPING = {
	playerWin: (playerName) => `Congratulations &#127881; ${playerName} Won!!&#128526;`,
	playersWin: (playersNames = []) => `Congratulations &#127881; ${playersNames.join(', ')} are Winners!!&#128526;`,
	cpu: 'Such a Loser &#129315; Try again!&#9917;',
	tie: "It's a tie!&#128528; Play again and make a win...&#128521;",
};

const getPlayerName = (num) => PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[num]];
