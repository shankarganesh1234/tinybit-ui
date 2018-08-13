import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Counter} from "../models/counter";
import {CCDetails} from "../models/cc-details";
import {CCDetail} from "../models/cc-detail";
import {Detail} from "../models/detail";


@Injectable()
export class CoreService {

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    /**
     * Get the current number of requests served count
     * @returns {Observable<Counter>}
     */
    getCount(): Observable<Counter> {
        let baseUrl = "tinybitserver/counter";
        return this.http
            .get(baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * get currencies for populating list
     * @returns {Observable<CCDetails>}
     */
    getCurrencies(): Observable<CCDetail[]> {
        let baseUrl = "tinybitserver/cc";
        return this.http
            .get(baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * @returns {Observable<Detail>}
     */
    createUrl(detail: Detail): Observable<Detail> {
        let baseUrl = "tinybitserver/";
        return this.http
            .post(baseUrl, detail)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * @param {String} key
     * @returns {Observable<Detail>}
     */
    getUrl(key: String): Observable<Detail> {
        let baseUrl = "tinybitserver/key/" + key;
        return this.http
            .get(baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}