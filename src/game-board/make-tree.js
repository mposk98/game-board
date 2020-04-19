const makeTree = ({
    rows,
    cols,
    classes = {
        lightCell: 'game-board_light-cell',
        darkCell: 'game-board_dark-cell',
    },
} = {
    rows: 8,
    cols: 8,
    classes: {
        lightCell: 'game-board_light-cell',
        darkCell: 'game-board_dark-cell',
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

    for (let row = 0; row < rows; row++) {
        board.childNodes[row] = {
            element: 'div',
            classList: ['game-board_row'],
            childNodes: {},
        };
        for (let col = 0; col < cols; col++) {
            const className = col % 2 === row % 2 ? classes.lightCell : classes.darkCell;
            const cellName = `${row}${col}`;
            board.childNodes[row].childNodes[cellName] = {
                element: 'div',
                classList: [className, 'game-board_cell'],
            };
        }
    }

    return tree;
};

export default makeTree;
