import {init, makeTemplete, parseJson} from './template';
import {mockAxios, addMockData, enableMocking, setAxiosMockInterceptors} from '../src/example/http/mock';
import {getUsers} from '../src/example';
import { UserModel } from '../src/example/view-model';

const itemList = async (textDiv: HTMLElement) => {
    let result = await mockAxios.get('https://dog.ceo/api/breeds/list/all');
    const first = [...result.data.mock];
    console.log(1, first);
    try {
        result = await mockAxios.get('https://dog.ceo/404-page');
    } catch (err) {
        console.log(2, err);
    }
    textDiv.innerHTML = parseJson({
        data: result
    });
};

const getUserList = (textDiv: HTMLElement) => {
    getUsers().subscribe((result: Array<UserModel>) => {
        textDiv.innerHTML = parseJson({
            data: result
        });
    })
};

const errorExcute = (textDiv: HTMLElement) => {
    mockAxios.get('https://dog.ceo/not-fount').then((result) => {
        console.log('Error : ', result);
    }, (error) => {
        console.log('Error : ', error);
    })
};

const execute = () => {
    init();
    addMockData('https://dog.ceo/api/breeds/list/all', {data: {mock: ['dogs']}});
    addMockData('https://dog.ceo/404-page', {status: 404, message: 'whoops'});
    setAxiosMockInterceptors(mockAxios);
    enableMocking(true);
    makeTemplete('get mock data', itemList);
    makeTemplete('get user data by json', getUserList);
    makeTemplete('404 Error', errorExcute);
};

execute();
