import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePhotosComponent } from './favorite-photos.component';

describe('FavoriteImagesComponent', () => {
  let component: FavoritePhotosComponent;
  let fixture: ComponentFixture<FavoritePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
