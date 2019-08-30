import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { TitleComponent } from './title/title.component';
import { SearchComponent } from './search/search.component';

 const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent,
        data: { animationName: 'animateToHome' }
    },
    {
        //path: 'actor/{id}',
        path: 'actor',
        component: ActorComponent,
        data: { animationName: 'animateToDetail' }
    },
    {
        //path: 'title/{id}',
        path: 'title',
        component: TitleComponent,
        data: { animationName: 'animateToDetail' }
    },
    { path: '', redirectTo: 'search', pathMatch: 'full' }
 ];

 @NgModule({
     imports: [
         RouterModule.forRoot(routes)
     ],
     exports: [
         RouterModule
     ],
     declarations: []
 })
 export class AppRoutingModule {}
