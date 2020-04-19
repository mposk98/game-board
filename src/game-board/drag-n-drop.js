/* eslint-disable no-param-reassign */
const movePiece = (event, piece) => {
    const { clientX, clientY } = event;
    const { style } = piece;
    style.left = `${clientX}px`;
    style.top = `${clientY}px`;
};

const addDragAndDrop = (publicInterface, elements, boardSize) => {
    let idFrom = null;

    const dragListener = (event) => {
        movePiece(event, elements.draggedPiece);
    };

    publicInterface.onDragStart = (callback) => {
        elements.board.addEventListener('mousedown', (event) => {
            const stringId = event.target.dataset.id;
            event.preventDefault();
            const dragPiece = callback(stringId.split(''));
            if (dragPiece !== null) {
                elements[stringId].style.backgroundImage = 'none';

                const { board, draggedPiece: { style: draggedPieceStyle } } = elements;

                draggedPieceStyle.display = 'block';
                draggedPieceStyle.backgroundImage = `url(${dragPiece})`;
                const pieceSize = `${board.clientWidth / boardSize}px`;
                draggedPieceStyle.width = pieceSize;
                draggedPieceStyle.height = pieceSize;

                idFrom = stringId;

                movePiece(event, elements.draggedPiece);
                window.addEventListener('mousemove', dragListener);
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
                elements.draggedPiece.style.display = 'none';
                window.removeEventListener('mousemove', dragListener);
            }
        });
        elements.board.addEventListener('mouseleave', () => {
            if (idFrom !== null) {
                const draggedPiece = callback(null);
                elements[idFrom].style.backgroundImage = `url(${draggedPiece})`;
                idFrom = null;
                elements.draggedPiece.style.display = 'none';
                window.removeEventListener('mousemove', dragListener);
            }
        });
    };
};

export default addDragAndDrop;
