import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import {PhotoComponent} from "./photo/photo.component";
import {MatCardModule} from "@angular/material/card";
import { NotFoundComponent } from './not-found/not-found.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    PhotosListComponent,
    PhotoComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
