import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {fromEvent, Subject, Subscription, takeUntil} from "rxjs";
import {IImageData} from "../../../models/types";

@Component({
  selector: 'pl-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent {
  @Input() images: IImageData[] | null = [];
  @Input() captionText: string = '';
  @Input() favoritesMode: boolean | undefined = false;
  @Output() imageClicked: EventEmitter<any> = new EventEmitter<any>();

  onImageClick(imgData: IImageData): void {
    this.imageClicked.emit(imgData);
  }
}
