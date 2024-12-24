import { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, Subscriber } from 'rxjs';
import { makeAxios } from '../../core/http';

const testAxios: AxiosInstance = makeAxios();

export function get<T = any>(url: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
        testAxios
            .get(url)
            .then((response: AxiosResponse) => {
                subscriber.next({
                    data: response.data,
                    status: response.status,
                    statusText: response.statusText
                });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
}

export function post<T = any, P = any>(url: string, param: P): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
        testAxios
            .post(url, param)
            .then((response: AxiosResponse) => {
                subscriber.next({
                    data: response.data,
                    status: response.status,
                    statusText: response.statusText
                });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
}

export function deleted<T = any, P = any>(url: string, param: P): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
        testAxios
            .delete(url, param)
            .then((response: AxiosResponse) => {
                subscriber.next({
                    data: response.data,
                    status: response.status,
                    statusText: response.statusText
                });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
}

export function put<T = any, P = any>(url: string, param: P): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
        testAxios
            .put(url, param)
            .then((response: AxiosResponse) => {
                subscriber.next({
                    data: response.data,
                    status: response.status,
                    statusText: response.statusText
                });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
}

export function patch<T = any, P = any>(url: string, param: P): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
        testAxios
            .patch(url, param)
            .then((response: AxiosResponse) => {
                subscriber.next({
                    data: response.data,
                    status: response.status,
                    statusText: response.statusText
                });
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
}
