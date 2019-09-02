import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemoviedbService {

    apiKey = '4ef409fa7ceee79e4b13b6067db5e86a';

    constructor(private http: HttpClient) {}

    // combine multiple requests
    /* public requestDataFromMultipleSources(): Observable < any[] > {
        let const1 = this.http.get(requestUrl1);
        let response2 = this.http.get(requestUrl2);
        let response3 = this.http.get(requestUrl3);
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([response1, response2, response3]);
    } */

    public searchKeyword(query: string): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/search/multi?api_key=' + this.apiKey + '&query=' + query);
    }

    public searchTitle(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey);
    }

    public searchTitleCast(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + this.apiKey);
    }

    public getActorAge(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/person/' + id + '?api_key=' + this.apiKey);
    }

}
