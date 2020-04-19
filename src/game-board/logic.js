/* eslint-disable no-param-reassign */

import addDragAndDrop from './drag-n-drop';

const addLogic = (boardSize) => (elements) => {
    const publicInterface = {};

    publicInterface.setPiece = ([row, col], url) => {
        const stringId = `${row}${col}`;
        elements[stringId].style.backgroundImage = `url(${url})`;
    };

    publicInterface.removePiece = ([row, col]) => {
        const stringId = `${row}${col}`;
        elements[stringId].style.backgroundImage = 'none';
    };

    publicInterface.onClick = (callback) => {
        elements.board.addEventListener('click', (event) => {
            event.preventDefault();
            callback(event.target.dataset.id.split(''));
        });
    };

    addDragAndDrop(publicInterface, elements, boardSize);

    const initSize = () => {
        const { main, board } = elements;
        const divSize = Math.min(main.clientHeight, main.clientWidth);
        const { style } = board;
        style.width = `${divSize}px`;
        style.height = `${divSize}px`;
    };

    window.addEventListener('resize', initSize);

    publicInterface.initSize = initSize;
    publicInterface.cleanup = () => {
        window.removeEventListener('resize', initSize);
    };

    publicInterface.elements = elements;

    return publicInterface;
};

export default addLogic;
