import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer, interval } from 'rxjs';
import { map, filter, tap, retryWhen, delayWhen, throttleTime } from 'rxjs/operators';
import { IMovie, IActorInMovie } from '../shared/movies&actors.interface';
import { ThemoviedbService } from '../shared/themoviedb.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit, OnDestroy {

    getMovie$: Subscription;
    getMovieCast$: Subscription;
    titleId: number;
    titleDetails: IMovie;
    cast: IActorInMovie[] = [];
    castSize: number = 0;

    constructor(private movieService: ThemoviedbService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.titleId = params.id );
    }

    ngOnInit() {
        this.getTitle(this.titleId);
        this.getTitleCast(this.titleId);
    }

    getTitle(id) {
        this.getMovie$ = this.movieService.searchTitle(id).subscribe(
            data => {
                this.titleDetails = {
                    title: data.title,
                    id: data.id,
                    original_title: data.original_title,
                    poster_path: data.poster_path,
                    release_date: new Date(data.release_date),
                    tagline: data.tagline,
                    overview: data.overview
                }
            },
            error => {
                console.log("Error getting movie: " +  error);
            }
        );
    }

    getTitleCast(id) {
        this.getMovie$ = this.movieService.searchTitleCast(id)
        .pipe(
            // rate limit
            tap(data => {
                let limit = data.headers.get('X-RateLimit-Remaining')
                //console.log(limit); // max 40
            }),
            // get actors only, excluding technical staff
            map(allCast => {
                return allCast.body.cast;
            })
        )
        .subscribe(
            data => {
                data.forEach((element, index = 0) => {

                    this.getMovieCast$ = this.movieService.getActor(element.id).pipe(
                        throttleTime(500), // does nothing
                        filter(actor => {
                            return actor.birthday !== null;
                        })
                    )
                    // todo: try to get around api rate limit (40, 10sec)
                    .subscribe(
                        actor => {

                            this.castSize++;
                            const movieChar = data[index].character;
                            const isAlive = actor.deathday ? actor.deathday : "";

                            this.cast.push({
                                id: actor.id,
                                name: actor.name,
                                character: movieChar,
                                birthday: new Date(actor.birthday),
                                deathday: isAlive,
                                picture: actor.profile_path,
                                ageDuringMovie: this.movieService.calculateYears(
                                    new Date(this.titleDetails.release_date),
                                    new Date(actor.birthday),
                                    new Date(isAlive)
                                    )
                            })

                            index++;
                        },
                        error => {
                            console.log(error);
                            if (error) {
                                return this.getMovieCast$;
                            }
                            console.log("Error getting ages");
                        }
                    )
                })
            },
            error => {
                console.log(error);
                console.log("I'm in getTitleCast");
            }
        )
    }

    ngOnDestroy() {
        this.getMovie$.unsubscribe();
        //this.getMovieCast.unsubscribe();
    }
}


