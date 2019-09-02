import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ThemoviedbService } from '../shared/themoviedb.service';
import { IMovie } from '../shared/movie.interface';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    getMovie: Subscription;
    titleId: number;
    titleDetails: IMovie;

    cast: [];

    constructor(private movieService: ThemoviedbService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.titleId = params.id );
    }

    ngOnInit() {

        this.getTitle(this.titleId);
        this.getTitleCast(this.titleId);
        console.log(this.titleDetails);
    }

    getTitle(id) {
        this.getMovie = this.movieService.searchTitle(id).subscribe(
            data => {
                this.titleDetails = {
                    title: data.title,
                    id: data.id,
                    original_title: data.original_title,
                    poster_path: data.poster_path,
                    release_date: data.release_date,
                    tagline: data.tagline
                }
                /* console.log(data.title);
                this.titleDetails.title = data.title;
                this.titleDetails.id = data.id;
                this.titleDetails.original_title = data.original_title;
                this.titleDetails.poster_path = data.poster_path;
                this.titleDetails.release_date = data.release_date;
                this.titleDetails.tagline = data.tagline; */
            },
            theError => {
                console.log("Error: " +  theError);
            }
        );
    }

    getTitleCast(id) {
        this.getMovie = this.movieService.searchTitleCast(id).subscribe(
            data => {
                this.cast = data.cast;
            },
            theError => {
                console.log("Error: " +  theError);
            }
        );
    }

}
