import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemoviedbService } from '../shared/themoviedb.service';
//import { IActor } from '../shared/actor.interface';
//import { IMovieFromActor } from '../shared/moviefromactor.interface';
import { IActorDetail } from '../shared/actordetail.interface';

@Component({
    selector: 'app-actor',
    templateUrl: './actor.component.html',
    styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit, OnDestroy {

    actorId: number;
    actor: IActorDetail;
    movieCount: number;
    jointSub: Subscription;

    constructor(private movieService: ThemoviedbService, private actRoute: ActivatedRoute) {
        this.actRoute.params.subscribe(params => this.actorId = params.id);
    }

    ngOnInit() {

        let getActorObs = this.movieService.getActor(this.actorId);
        let getActorsMoviesObs = this.movieService.getActorsMovies(this.actorId)
            // get movies where person was actor, not producer, etc
            .pipe(map(allWorks => { return allWorks.cast }))
            // exclude obscure movies without release date
            .pipe(map(movies => movies.filter(
                mov => (mov.release_date)
            )));


        this.jointSub = forkJoin([getActorObs, getActorsMoviesObs])
            .subscribe(
                res => {
                    const personal = res[0];
                    const work = res[1];

                    const isAlive = personal.deathday ? personal.deathday : '';
                    let gender;
                    if (personal.gender === 0) {
                        gender = 'Non-binary';
                    } else if (personal.gender === 1) {
                        gender = 'Female';
                    } else {
                        gender = 'Male';
                    }
                    // actor details
                    this.actor = {
                        biography: personal.biography,
                        birthday: new Date(personal.birthday),
                        deathday: isAlive,
                        gender: gender,
                        id: personal.id,
                        name: personal.name,
                        place_of_birth: personal.place_of_birth,
                        popularity: personal.popularity,
                        picture: personal.profile_path,
                        movies: []
                    }

                    // actor's movies's details
                    this.movieCount = work.length;
                    
                    work.forEach(mov => {
                        this.actor.movies.push({
                            movieId: mov.id,
                            poster_path: mov.poster_path,
                            release_date: new Date(mov.release_date),
                            title: mov.title,
                            character: mov.character,
                            ageDuringMovie: this.movieService.calculateYears(
                                new Date(mov.release_date),
                                new Date(personal.birthday)
                            )
                        });
                    });

                    // order films recent > older
                    this.actor.movies.sort(function(a,b) {
                        return b.release_date.getTime() - a.release_date.getTime();
                    });
                }
            );
    }

    ngOnDestroy() {
        this.jointSub.unsubscribe();
    }
}