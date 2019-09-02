import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../shared/themoviedb.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResponse } from '../shared/searchresponse.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

    searchQuery: string = null;
    searchResults: SearchResponse[];
    totalResults: string;
    searchSub: Subscription;
    imagePath = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

    constructor(private movieService: ThemoviedbService) {}

    ngOnInit() {
        // TEST FUNC
        //this.onSearch('name of the');
    }


    onSearch(query) {
        if (query.length <= 2) {
            this.searchResults = [];
            return;
        }
        this.searchResults = [];
        this.searchSub = this.movieService.searchKeyword(query)
            .pipe(
                // get total results & discard info other than the results array
                map(data => {
                    this.totalResults = data.total_results;
                    if ( +this.totalResults === 10000 ) {
                        this.totalResults = '+10.000';
                    }
                    return data.results.map(result => {
                        return { result }
                    });
                }),
                // exclude non actors (technical staff)
                map(results => {
                        return results.filter(x => {
                            return x.result.media_type !== 'person' || (
                                x.result.media_type === 'person' &&
                                x.result.known_for_department === 'Acting'
                            )
                        })
                    }
                )
            ).subscribe(
                data => {
                    data.forEach(el => {

                        let isPerson: boolean;
                        let posterOrPhoto: string;
                        let name: string;

                        if (el.result.media_type === 'person') {
                            el.result.profile_path === null ? posterOrPhoto = 'assets/images/user.jpg' : posterOrPhoto = this.imagePath + el.result.profile_path;
                            name = el.result.name;
                            isPerson = true;
                        } else {
                            el.result.poster_path === null ? posterOrPhoto = 'assets/images/reel.jpg' : posterOrPhoto = this.imagePath + el.result.poster_path;
                            el.result.name === undefined ? name = el.result.title : name = el.result.name;
                            isPerson = false;
                        }

                        let newRes = new SearchResponse(
                           el.result.id,
                           isPerson,
                           name,
                           posterOrPhoto
                        );
                        this.searchResults.push(newRes);
                    });
                },
                theError => {
                    console.log("custom error: " +  theError);
                }
            );
    }

    goToDetail(id: number, isPerson: boolean) {
        // here check if is person or not, navigate, unsubscribe, etc
    }
}

