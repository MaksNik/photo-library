import { TestBed } from '@angular/core/testing';

import { FavoritePhotosService } from './favorite-photos.service';

describe('FavoritePhotosService', () => {
  let service: FavoritePhotosService;
  let localStorageSpy: jasmine.Spy<any>;
  const mockImageData = { id: '1', imgSrc: 'src', addedToFavorites: true };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePhotosService);

    localStorageSpy = spyOn(window.localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addPhotoToFavorites method', () => {
    it('new added photos should be stored in Set collection', () => {
      service.addPhotoToFavorites(mockImageData);
      expect(service['_favoriteImages'].has(mockImageData)).toBe(true);
    });

    it('consumers should be informed about changes in favorites store', () => {
      const favoriteImageSubjectSpy = spyOn(service.favoriteImages$, 'next');
      service.addPhotoToFavorites(mockImageData);
      expect(favoriteImageSubjectSpy).toHaveBeenCalledWith([mockImageData]);
    });

    it('new added photos should be stored in browser\'s local storage', () => {
      service.addPhotoToFavorites(mockImageData);
      expect(localStorageSpy).toHaveBeenCalledWith('favoritePhotos', '[{"id":"1","imgSrc":"src","addedToFavorites":true}]');
    });

    afterEach(() => {
      window.localStorage.clear();
    });
  });

  describe('deletePhotoFromFavorites method', () => {
    beforeEach(() => {
      service.addPhotoToFavorites(mockImageData);
    });

    it('should delete photo from service\'s Set collection', () => {
      service.deletePhotoFromFavorites('1');
      expect(service['_favoriteImages'].has(mockImageData)).toBe(false);
    });

    it('consumers should be informed about changes in favorites store', () => {
      const favoriteImageSubjectSpy = spyOn(service.favoriteImages$, 'next');
      service.deletePhotoFromFavorites('1');
      expect(favoriteImageSubjectSpy).toHaveBeenCalledWith([]);
    });

    it('should update local storage', () => {
      service.deletePhotoFromFavorites('1');
      expect(localStorageSpy).toHaveBeenCalledWith('favoritePhotos', '[]');
    });

    afterEach(() => {
      window.localStorage.clear();
    });
  });
});
