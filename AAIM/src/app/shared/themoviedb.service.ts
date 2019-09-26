import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemoviedbService {

    apiKey = '4ef409fa7ceee79e4b13b6067db5e86a';

    constructor(private http: HttpClient) {}

    public searchKeyword(query: string): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/search/multi?api_key=' + this.apiKey + '&query=' + query);
    }

    public searchTitle(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey);
    }

    public searchTitleCast(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + this.apiKey, {observe: 'response'}); // observe response to read headers
    }

    public getActor(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/person/' + id + '?api_key=' + this.apiKey);
    }

    public getActorPhotos(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/person/' + id + '/images?api_key=' + this.apiKey);
    }

    public getActorsMovies(id: number): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + this.apiKey)
    }

    public calculateYears(movieDate, actorDate, deathDay) {

        let isAlive = true;
        if (deathDay instanceof Date && !isNaN(deathDay.getTime())) {
            isAlive = false;
        }

        // movie date is known
        if (movieDate) {
            if  ( !isAlive &&  (deathDay.getTime() < movieDate.getTime())) {
                // actor is dead during production (symbolically age = 999; ex: Jim Morrison)
                return 999;
            } else {
                const diffTime = Math.abs(movieDate.getTime() - actorDate.getTime());
                return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
            }
        } else {
            return 0;
        }
    }

}
