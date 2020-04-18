import GameBoard from '../src/game-board';

const rootView = document.createElement('div');
rootView.setAttribute('style', 'width: 100%; height: 90vh');

const gameBoard = GameBoard({ classes: { lightCell: 'game-board_light-cell', darkCell: 'game-board_dark-cell' } });

rootView.appendChild(gameBoard.main);
document.body.appendChild(rootView);
gameBoard.initSize();
