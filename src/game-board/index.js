import compose from '../utils/compose';
import createElements from '../utils/create-elements';
import makeTree from './make-tree';
import addLogic from './logic';
import './styles.less';

const GameBoard = (options = {
    size: 8,
    classes: {
        lightCell: 'game-board_light-cell',
        darkCell: 'game-board_dark-cell',
    },
}) => compose(addLogic(options.size), createElements, makeTree)(options);

export default GameBoard;
