import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {BehaviorSubject} from "rxjs";
import {FavoritePhotosService} from "../../services/favorite-photos.service";
import {IImageData} from "../../models/types";

@Component({
  selector: 'pl-random-photos',
  templateUrl: './random-photos.component.html',
  styleUrls: ['./random-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomPhotosComponent implements OnInit, OnDestroy {
  private photosCount: number = 10;
  private observer: IntersectionObserver | undefined;

  photos$: BehaviorSubject<IImageData[]> = new BehaviorSubject<IImageData[]>([]);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('scrollAnchor', { static: true }) scrollAnchor: ElementRef | undefined;

  constructor(private photoService: PhotoService,
              private favoritePhotosService: FavoritePhotosService) {}

  ngOnInit(): void {
    this.loadMoreImages();

    const options: IntersectionObserverInit = {
      root: null
    };

   this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadMoreImages();
      }
    }, options);

   this.observer.observe(this.scrollAnchor?.nativeElement);
  }

  private loadMoreImages(): void {
    this.isLoading$.next(true);
    this.photoService.loadImages(this.photosCount)
      .subscribe(images => {
      this.photos$.next(this.photos$.value.concat(images));
      this.isLoading$.next(false);
    });
  }

  addToFavorites(imgData: IImageData): void {
    imgData.addedToFavorites = true;
    this.favoritePhotosService.addPhotoToFavorites(imgData);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
