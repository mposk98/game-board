/* eslint-disable no-param-reassign */
const movePiece = (event, piece, pieceSize) => {
    const { clientX, clientY } = event;
    const { style } = piece;
    const delta = pieceSize / 2;
    style.left = `${clientX - delta}px`;
    style.top = `${clientY - delta}px`;
};

const addDragAndDrop = (publicInterface, elements, boardSize) => {
    let idFrom = null;

    const dragListener = (pieceSize) => (event) => {
        movePiece(event, elements.draggedPiece, pieceSize);
    };

    publicInterface.onDragStart = (callback) => {
        elements.board.addEventListener('mousedown', (event) => {
            const stringId = event.target.dataset.id;
            event.preventDefault();
            const dragPiece = callback(stringId.split(''));
            if (dragPiece !== null) {
                const pieceSize = (elements.board.clientWidth / boardSize) * 0.9;
                const pieceSizeString = `${pieceSize}px`;

                elements[stringId].style.backgroundImage = 'none';

                const { draggedPiece: { style: draggedPieceStyle } } = elements;

                draggedPieceStyle.display = 'block';
                draggedPieceStyle.backgroundImage = `url(${dragPiece})`;
                draggedPieceStyle.width = pieceSizeString;
                draggedPieceStyle.height = pieceSizeString;

                idFrom = stringId;

                movePiece(event, elements.draggedPiece, pieceSize);
                window.addEventListener('mousemove', dragListener(pieceSize));
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
