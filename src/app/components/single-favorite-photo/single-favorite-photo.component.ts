import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FavoritePhotosService} from "../../services/favorite-photos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IImageData} from "../../models/types";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'pl-single-favorite-photo',
  templateUrl: './single-favorite-photo.component.html',
  styleUrls: ['./single-favorite-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleFavoritePhotoComponent implements OnInit {
  private id: string = '';
  imgSrc$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private favoriteImagesService: FavoritePhotosService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.imgSrc$.next(this.getImageById(this.id).imgSrc);
  }

  private getImageById(id: string): IImageData {
    return this.favoriteImagesService.favoriteImages$.value.find(item => item.id === id) || { id: '', imgSrc: '' };
  }

  removeFromFavorites(): void {
    this.favoriteImagesService.deletePhotoFromFavorites(this.id);
    this.goToFavorites();
  }

  goToFavorites(): void {
    this.router.navigate(['favorites']);
  }
}
