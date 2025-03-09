const PLAYER_NAME_KEY = {
	one: 'one',
	two: 'two',
	three: 'three',
	four: 'four',
	five: 'five',
	six: 'six',
	cpu: 'cpu',
	none: 'none',
};

const FREE_PLAY = 'free_play';
const MULTIPLAYER = 'multiplayer';
const ONE_VS_CPU = '1_vs_cpu';

const MAX_NUMBER_OF_MULTIPLAYER = 6;
const MINIMUM_HORIZONTAL_SPEED_TO_MOVE = 0.01;
const FRAME_RATE = 10; // 1 frame / (FRAME_RATE) ms

const BALL_HEIGHT = 40;
const BALL_WIDTH = 40;
const SCORE_POINT_DOT_WIDTH = 8;
const SCORE_POINT_DOT_HEIGHT = 8;

const INITIAL_TURN_MAPPING = {
	[FREE_PLAY]: PLAYER_NAME_KEY.none,
	[MULTIPLAYER]: PLAYER_NAME_KEY.one,
	[ONE_VS_CPU]: PLAYER_NAME_KEY.one,
};

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

const PLAYER_COLOR_MAPPING = {
	[PLAYER_NAME_KEY.one]: '#8cd521',
	[PLAYER_NAME_KEY.two]: '#e3692c',
	[PLAYER_NAME_KEY.three]: '#d5778e',
	[PLAYER_NAME_KEY.four]: '#d572d5',
	[PLAYER_NAME_KEY.five]: '#8bbcf7',
	[PLAYER_NAME_KEY.six]: '#f3d66b',
	[PLAYER_NAME_KEY.cpu]: '#e3692c',
	[PLAYER_NAME_KEY.none]: '',
};

/**
 * constants for whole play after submit and restart
 */
let G = 0.08; //default gravity
let E = 0.8; //default elasticity
let PLAY_MODE = FREE_PLAY; //default play mode
let MAXIMUM_POSSIBLE_SCORE = 15; //maximum points that can be earned
let TOTAL_NUMBER_OF_ROUNDS = 3; //number of rounds to decide who win
let E_X = Math.min(E * 1.1, 0.99); //E effect on horizontal velocity when ball touch on vertical edges
let NUMBER_OF_PLAYERS = 1;

/**
 * timely being updated and used variables from multiple functions
 */
let currentSelectedPlayer = PLAYER_NAME_KEY.none;
let currentScore = 0;
let highestScore = 0;
let currentScoresArray = [];
let overallScoresArray = [];
let numberOfRoundsPassed = 0;

let projectileMotionIntervalId;
let isMouseDown = false;
let isLongClick = false;
let isPlaygroundDisabled = true;

let PLAYER_NAME_KEY_LABEL_MAPPING = {
	[PLAYER_NAME_KEY.cpu]: 'CPU',
	[PLAYER_NAME_KEY.one]: '',
	[PLAYER_NAME_KEY.two]: '',
	[PLAYER_NAME_KEY.three]: '',
	[PLAYER_NAME_KEY.four]: '',
	[PLAYER_NAME_KEY.five]: '',
	[PLAYER_NAME_KEY.six]: '',
};

const NUM_TO_WORD_MAPPING = {
	1: PLAYER_NAME_KEY.one,
	2: PLAYER_NAME_KEY.two,
	3: PLAYER_NAME_KEY.three,
	4: PLAYER_NAME_KEY.four,
	5: PLAYER_NAME_KEY.five,
	6: PLAYER_NAME_KEY.six,
};

const WORD_TO_NUM_MAPPING = {
	[PLAYER_NAME_KEY.one]: 1,
	[PLAYER_NAME_KEY.two]: 2,
	[PLAYER_NAME_KEY.three]: 3,
	[PLAYER_NAME_KEY.four]: 4,
	[PLAYER_NAME_KEY.five]: 5,
	[PLAYER_NAME_KEY.six]: 6,
};

const WIN_TEXT_MAPPING = {
	playerWin: (playerName) => `Congratulations &#127881; ${playerName} Won!!&#128526;`,
	playersWin: (playersNames = []) => `Congratulations &#127881; ${playersNames.join(', ')} are Winners!!&#128526;`,
	cpu: 'Such a Loser &#129315; Try again!&#9917;',
	tie: "It's a tie!&#128528; Play again and make a win...&#128521;",
};

const getToastProps = () => {
	const color = PLAYER_COLOR_MAPPING[currentSelectedPlayer];
	switch (currentSelectedPlayer) {
		case PLAYER_NAME_KEY.cpu:
			return ['CPU', color];
		case PLAYER_NAME_KEY.none:
			return ['Free Play', color];
		default:
			return [PLAYER_NAME_KEY_LABEL_MAPPING[currentSelectedPlayer], color];
	}
};

const ARRAY_FOR_ITERATION = (n = 0) => Array.from({ length: n }, (_, index) => index);

const getPlayerName = (num) => PLAYER_NAME_KEY_LABEL_MAPPING[NUM_TO_WORD_MAPPING[num]];
