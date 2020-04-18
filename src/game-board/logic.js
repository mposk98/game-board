/* eslint-disable no-param-reassign */

const addLogic = (elements) => {
    elements.setPiece = ([row, col], url) => {
        elements[`${row}${col}`].style.backgroundImage = `url(${url})`;
    };

    elements.removePiece = ([row, col]) => {
        elements[`${row}${col}`].style.backgroundImage('none');
    };

    const initSize = () => {
        const { main, board } = elements;
        const size = Math.min(main.clientHeight, main.clientWidth);
        board.setAttribute('style', `width: ${size}px; height: ${size}px`);
    };

    window.addEventListener('resize', initSize);

    elements.initSize = initSize;
    elements.cleanup = () => {
        window.removeEventListener('resize', initSize);
    };
    return elements;
};

export default addLogic;
