# AAIM

Wanna know how old some actor was in a movie? This is the place.

See how old/young he/she looks, how poor was the character makeup or use it if you just have some weird age obsession.

Angular/RxJs

## API & Tools

https://developers.themoviedb.org

https://www.npmjs.com/package/ngx-owl-carousel-o

## TODO

Workaround rate limit (test throttleTime https://rxjs-dev.firebaseapp.com/api/operators/throttleTime)

## Tests

Movie with no release date (Embattled):
https://api.themoviedb.org/3/movie/592643

Actor deceased at film production (not posthumous release, archive footage used instead, meaning that age during movie may be unknwon, multivalue or impossible to assess):
ID: 152 (Jim Morrison)
ID: 3663 (Jerry Lewis)

Movie ID: 501350 (The Doors - Live at the Isle of Wight Festival 1970)
In case of movie actors dead upon release show "Posthumous production", others show age at release, age during footage capture is impossible to assess
