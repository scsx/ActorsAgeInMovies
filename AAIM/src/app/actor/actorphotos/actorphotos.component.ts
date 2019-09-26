import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { OwlOptions } from 'ngx-owl-carousel-o';

import { ThemoviedbService } from 'src/app/shared/themoviedb.service';

@Component({
    selector: 'app-actorphotos',
    templateUrl: './actorphotos.component.html',
    styleUrls: ['./actorphotos.component.scss']
})
export class ActorPhotosComponent implements OnInit, OnDestroy {

    actorId: number;
    actorName: string;
    photosSub$: Subscription;
    photos: Array < any > = [];

    owlOptions: OwlOptions = {
        loop: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        navSpeed: 700,
        nav: false,
        responsive: {
            0: {
                items: 1
            }
        }
    }

    constructor(
        private movieService: ThemoviedbService,
        private actRoute: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        // get id
        this.actRoute.params.subscribe(
            (params: Params) => { this.actorId = +params['id'] }
        );
        // get name
        this.getName(this.actorId);
        // get photos
        this.getPhotos(this.actorId);

    }

    getPhotos(id) {
        this.photosSub$ = this.movieService.getActorPhotos(id)
            .pipe(
                map(allData => { return allData.profiles })
            )
            .subscribe(
                data => {
                    this.photos = data;
                },
                error => {
                    console.log("Error " + error);
                }
            );
    }

    getName(id) {
        this.movieService.getActor(id).subscribe(res => {
            this.actorName = res.name;
        });
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        this.photosSub$.unsubscribe();
    }

}
