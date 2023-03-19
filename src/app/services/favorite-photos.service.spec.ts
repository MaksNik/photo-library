import { TestBed } from '@angular/core/testing';

import { FavoritePhotosService } from './favorite-photos.service';

describe('FavoriteImagesService', () => {
  let service: FavoritePhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
