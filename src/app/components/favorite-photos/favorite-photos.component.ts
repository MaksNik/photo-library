import {Component, OnInit} from '@angular/core';
import {FavoritePhotosService} from "../../services/favorite-photos.service";
import { Observable } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IImageData} from "../../models/types";

@Component({
  selector: 'pl-favorite-photos',
  templateUrl: './favorite-photos.component.html',
  styleUrls: ['./favorite-photos.component.scss']
})
export class FavoritePhotosComponent implements OnInit {
  favoriteImages$: Observable<IImageData[]> = new Observable<IImageData[]>();

  constructor(private favoriteImagesService: FavoritePhotosService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.favoriteImages$ = this.favoriteImagesService.favoriteImages$.asObservable();
  }

  showDetails(evt: {id: string, img: string}): void {
    this.router.navigate([evt.id], { relativeTo: this.route });
  }
}
