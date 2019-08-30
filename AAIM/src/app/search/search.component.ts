import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../shared/themoviedb.service';
import { Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { SearchResponse } from '../shared/searchresponse.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchQuery: string = null;
    //searchResults: SearchResponse[];
    searchResults: any;
    totalResults: string;
    searchSub: Subscription;

    constructor(private movieService: ThemoviedbService) {}

    ngOnInit() {
        // TEST FUNC
        //this.onSearch('soprano');
        this.onSearch('Brad');
    }

    onSearch(query) { // here should return Obs with type SearchResponse ?
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
                filter((results, i) => {
                    //console.log(results);
                    console.log(results[i].result.media_type);
                    const item = results[i].result;
                    return item.media_type === 'person';
                    /* if (results.media_type !== 'person' || (results.media_type === 'person' && results.known_for_department === 'Acting')) {
                        console.log(results.media_type);
                        return true;
                    } */
                })
            ).subscribe(
                data => {
                    console.log(data);
                    this.searchResults = data;
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
