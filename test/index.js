import GameBoard from '../src/game-board';
import white from './icons/white-man.svg';
import black from './icons/black-man.svg';

const rootView = document.createElement('div');
rootView.setAttribute('style', 'width: 100%; height: 90vh');

const gameBoard = GameBoard();

rootView.appendChild(gameBoard.elements.main);
document.body.appendChild(rootView);
gameBoard.initSize();

gameBoard.setPiece([0, 0], white);
gameBoard.setPiece([0, 1], black);
gameBoard.setPiece([1, 0], white);
gameBoard.setPiece([1, 1], black);
gameBoard.removePiece([0, 0]);

// gameBoard.onClick((id) => {
//     gameBoard.setPiece(id, white);
// });
gameBoard.onDragStart(() => true);
gameBoard.onDragEnd(() => white);
