/* eslint-disable no-param-reassign */

const addLogic = (elements) => {
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

    let idFrom = null;

    publicInterface.onDragStart = (callback) => {
        elements.board.addEventListener('mousedown', (event) => {
            const stringId = event.target.dataset.id;
            event.preventDefault();
            const dragPiece = callback(stringId.split(''));
            if (dragPiece !== null) {
                elements[stringId].style.backgroundImage = 'none';
                idFrom = stringId;
            }
        });
    };

    publicInterface.onDragEnd = (callback) => {
        elements.board.addEventListener('mouseup', (event) => {
            if (idFrom !== null) {
                event.preventDefault();
                const idTo = event.target.dataset.id;
                const draggedPiece = callback(idTo.split(''));
                if (draggedPiece !== null) {
                    elements[idTo].style.backgroundImage = `url(${draggedPiece})`;
                    idFrom = null;
                } else {
                    elements[idFrom].style.backgroundImage = `url(${draggedPiece})`;
                    idFrom = null;
                }
            }
        });
    };

    const initSize = () => {
        const { main, board } = elements;
        const size = Math.min(main.clientHeight, main.clientWidth);
        board.setAttribute('style', `width: ${size}px; height: ${size}px`);
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
