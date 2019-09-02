import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IMovie } from '../shared/movie.interface';
import { ThemoviedbService } from '../shared/themoviedb.service';

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
            },
            theError => {
                console.log("Error: " +  theError);
            }
        );
    }

    getTitleCast(id) {
        this.getMovie = this.movieService.searchTitleCast(id)
        .pipe(
            /* map(allCast => {
                console.log(allCast.cast);
                    allCast.cast.map(person => `${person.name} ${person.id}`)
                }
            ) */
            map(
                allCast => { return allCast.cast }
            )
            //.take(20)
        ).subscribe(
            data => {
                console.log(data);
                //this.cast = data;
                //console.log(this.cast);
                /* data.cast.forEach(element => {
                    let x = this.movieService.getActorAge(element.id).subscribe(
                        actor => {
                            //console.log(actor.birthday);
                            //this.cast = this.cast(...actor);
                        }
                    );
                    
                    
                }); */
            },
            theError => {
                console.log("Error: " +  theError);
            }
        );
    }

}
