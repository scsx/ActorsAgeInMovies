//https://angular.io/guide/route-animations#styling-the-host-and-child-components

import {
trigger,
style,
animate,
transition,
group,
query,
animateChild
} from '@angular/animations';

export const allAnimations =
trigger('routeAnimationsTrigger', [
    transition('animateToHome <=> animateToDetail', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 1,
            })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('400ms ease-in', style({ left: '100%', opacity: 0 }))
            ]),
            query(':enter', [
                animate('400ms ease-in', style({ left: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ])
]);
