import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {combineLatest, delay, fromEvent, map, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {IImageData} from "../models/types";
import {getRandomInt} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnDestroy {
  private static URL = 'https://picsum.photos/1920/1080';
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  loadImages(count: number): Observable<IImageData[]> {
    return combineLatest([...Array(count).fill(this.getImage())])
      .pipe(
        takeUntil(this.unsubscribe$),
        map((imgs: string[]) => imgs.map(imgSrc => {
          return {
            id: uuidv4(),
            imgSrc,
          }
        }))
      );
  }

  private getImage(): Observable<string | ArrayBuffer | null> {
    return this.httpClient.get(PhotoService.URL, { responseType: 'blob' })
      .pipe(
        takeUntil(this.unsubscribe$),
        // slow response imitation for spinner visibility
        delay(getRandomInt(200,300)),
        switchMap((imageBlob: Blob) => this.createImageFromBlob(imageBlob))
      )
  }

  private createImageFromBlob(imageBlob: Blob): Observable<string | ArrayBuffer | null> {
    const reader = new FileReader();

    const load$ = fromEvent(reader, 'load').pipe(
      map((evt: Event) => (evt.target as FileReader).result)
    );

    if (imageBlob) {
      reader.readAsDataURL(imageBlob);
    }

    return load$;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
