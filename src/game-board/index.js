import compose from '../utils/compose';
import createElements from '../utils/create-elements';
import makeTree from './make-tree';
import addLogic from './logic';
import './styles.less';

const GameBoard = (options) => compose(addLogic, createElements, makeTree)(options);

export default GameBoard;
