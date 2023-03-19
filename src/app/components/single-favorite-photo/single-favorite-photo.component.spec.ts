import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFavoritePhotoComponent } from './single-favorite-photo.component';

describe('SingleImageDetailsComponent', () => {
  let component: SingleFavoritePhotoComponent;
  let fixture: ComponentFixture<SingleFavoritePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFavoritePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFavoritePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
