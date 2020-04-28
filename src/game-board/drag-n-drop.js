/* eslint-disable no-param-reassign */
const movePiece = (event, piece, pieceSize) => {
    const { clientX, clientY } = event;
    const { style } = piece;
    const delta = pieceSize / 2;
    style.left = `${clientX - delta}px`;
    style.top = `${clientY - delta}px`;
};

const addDragAndDrop = (publicInterface, elements, boardSize) => {
    const dragListener = (pieceSize) => (event) => {
        movePiece(event, elements.draggedPiece, pieceSize);
    };

    let dragFlag = false;

    publicInterface.onDragStart = (callback) => {
        elements.board.addEventListener('mousedown', (event) => {
            const stringId = event.target.dataset.id;
            event.preventDefault();
            const dragPiece = callback(stringId.split('').map((coord) => Number(coord)));
            if (dragPiece !== null) {
                dragFlag = true;
                const pieceSize = (elements.board.clientWidth / boardSize) * 0.9;
                const pieceSizeString = `${pieceSize}px`;

                elements[stringId].style.backgroundImage = 'none';

                const { draggedPiece: { style: draggedPieceStyle } } = elements;

                draggedPieceStyle.display = 'block';
                draggedPieceStyle.backgroundImage = `url(${dragPiece})`;
                draggedPieceStyle.width = pieceSizeString;
                draggedPieceStyle.height = pieceSizeString;

                movePiece(event, elements.draggedPiece, pieceSize);
                window.addEventListener('mousemove', dragListener(pieceSize));
            }
        });
    };

    publicInterface.onDragEnd = (callback) => {
        elements.board.addEventListener('mouseup', (event) => {
            if (dragFlag) {
                dragFlag = false;
                event.preventDefault();
                const idTo = event.target.dataset.id;
                if (callback) callback(idTo.split('').map((coord) => Number(coord)));
                elements.draggedPiece.style.display = 'none';
                window.removeEventListener('mousemove', dragListener);
            }
        });
        elements.board.addEventListener('mouseleave', () => {
            if (dragFlag) {
                dragFlag = false;
                if (callback) callback(null);
                elements.draggedPiece.style.display = 'none';
                window.removeEventListener('mousemove', dragListener);
            }
        });
    };
};

export default addDragAndDrop;
