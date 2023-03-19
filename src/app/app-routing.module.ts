import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RandomPhotosComponent} from "./components/random-photos/random-photos.component";
import {FavoritePhotosComponent} from "./components/favorite-photos/favorite-photos.component";
import {SingleFavoritePhotoComponent} from "./components/single-favorite-photo/single-favorite-photo.component";
import {NotFoundComponent} from "./components/shared/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: RandomPhotosComponent },
  { path: 'favorites', component: FavoritePhotosComponent },
  { path: 'favorites/:id', component: SingleFavoritePhotoComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
