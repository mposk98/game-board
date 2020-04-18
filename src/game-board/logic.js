/* eslint-disable no-param-reassign */

const addLogic = (elements) => {
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
