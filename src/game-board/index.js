import compose from '../utils/compose';
import createElements from '../utils/create-elements';
import makeTree from './make-tree';
import addLogic from './logic';
import './styles.less';

const GameBoard = (options) => {
    const publicInterface = {};
    const elements = compose(addLogic(publicInterface), createElements, makeTree)(options);
    publicInterface.elements = elements;
    return publicInterface;
};

export default GameBoard;
