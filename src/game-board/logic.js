/* eslint-disable no-param-reassign */

const addLogic = (publicInterface) => (elements) => {
    publicInterface.setPiece = ([row, col], url) => {
        elements[`${row}${col}`].style.backgroundImage = `url(${url})`;
    };

    publicInterface.removePiece = ([row, col]) => {
        elements[`${row}${col}`].style.backgroundImage = 'none';
    };

    elements.board.addEventListener('click', (event) => {
        event.preventDefault();
        const handler = publicInterface.onClick;
        if (typeof handler === 'function') handler(event.target.id.split(''));
    });

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
    return elements;
};

export default addLogic;
