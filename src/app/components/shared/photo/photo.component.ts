import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pl-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnChanges {
  @Input() imageSrc: string | null = '';
  @Input() largeImageSize: boolean = false;
  @Input() captionText: string = '';
  @Input() addedToFavorites: boolean | undefined = false;
  @Input() favoritesMode: boolean | undefined = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['addedToFavorites']?.firstChange && changes['addedToFavorites']?.currentValue) {
      if (!this.favoritesMode && this.captionText) {
        this.captionText = 'Added to favorites!'
      }
    }
  }
}
