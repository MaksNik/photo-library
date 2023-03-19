import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IImageData} from "../models/types";

const FAVORITE_PHOTOS_KEY = 'favoritePhotos';

@Injectable({
  providedIn: 'root'
})
export class FavoritePhotosService {
  private readonly _favoriteImages: Set<IImageData>;

  favoriteImages$: BehaviorSubject<IImageData[]> = new BehaviorSubject<IImageData[]>([]);

  constructor() {
    const storedData = this.getDataFromLocalStorage();
    this._favoriteImages = new Set(storedData);
    this.favoriteImages$.next(storedData);
  }

  private saveInLocalStorage(): void {
    localStorage.setItem(FAVORITE_PHOTOS_KEY, JSON.stringify([...this._favoriteImages]));
  }

  private getDataFromLocalStorage(): IImageData[] {
    const data = localStorage.getItem(FAVORITE_PHOTOS_KEY);
    return data ? JSON.parse(data) : [];
  }

  addPhotoToFavorites(image: IImageData): void {
    this._favoriteImages.add(image);
    this.favoriteImages$.next([...this._favoriteImages]);
    this.saveInLocalStorage();
  }

  deletePhotoFromFavorites(id: string): void {
    let photoToDelete = null;

    this._favoriteImages.forEach((item) => {
      if (item.id === id) {
        photoToDelete = item;
      }
    });

    if (photoToDelete) {
      this._favoriteImages.delete(photoToDelete);
    }

    this.saveInLocalStorage();
    this.favoriteImages$.next([...this._favoriteImages]);
  }
}
