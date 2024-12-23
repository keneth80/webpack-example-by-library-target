import {Observable, map} from 'rxjs';
import {get} from '../http';
import {User} from './example-model';

export function getJsonplaceholder(): Observable<Array<User>> {
    return get<Array<User>>('https://jsonplaceholder.typicode.com/users').pipe(map((result: {data: any}) => result.data));
}
