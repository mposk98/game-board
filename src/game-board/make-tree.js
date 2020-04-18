const makeTree = ({
    rows = 8,
    cols = 8,
    classes: {
        lightCell,
        darkCell,
    },
}) => {
    const tree = {
        main: {
            element: 'div',
            classList: ['game-board_main'],
            childNodes: {
                board: {
                    element: 'div',
                    classList: ['game-board_board'],
                    childNodes: {},
                },
            },
        },
    };

    const { board } = tree.main.childNodes;

    const light = lightCell || 'game-board_light-cell';
    const dark = darkCell || 'game-board_dark-cell';

    for (let row = 0; row < rows; row++) {
        board.childNodes[row] = {
            element: 'div',
            classList: ['game-board_row'],
            childNodes: {},
        };
        for (let col = 0; col < cols; col++) {
            const className = col % 2 === row % 2 ? light : dark;
            board.childNodes[row].childNodes[col] = {
                element: 'div',
                classList: [className, 'game-board_cell'],
            };
        }
    }

    return tree;
};

export default makeTree;
