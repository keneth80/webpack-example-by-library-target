import {init, makeTemplete, parseJson} from './template';

const itemList = (textDiv: HTMLElement) => {
    textDiv.innerHTML = parseJson({
        test: 'test data!'
    });
};

const execute = () => {
    init();
    makeTemplete('get item list', itemList);
};

execute();
