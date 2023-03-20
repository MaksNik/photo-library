import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFavoritePhotoComponent } from './single-favorite-photo.component';
import {ActivatedRoute} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FavoritePhotosService} from "../../services/favorite-photos.service";

describe('SingleFavoritePhotoComponent', () => {
  let component: SingleFavoritePhotoComponent;
  let fixture: ComponentFixture<SingleFavoritePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFavoritePhotoComponent ],
      providers: [
        FavoritePhotosService,
        {
        provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: () => 'id1'
            }
          }
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFavoritePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find proper image by id', () => {
    component['favoriteImagesService'].addPhotoToFavorites({id: 'id1', imgSrc: 'src1', addedToFavorites: true});
    component['favoriteImagesService'].addPhotoToFavorites({id: 'id2', imgSrc: 'src2', addedToFavorites: true});

    const imgSrcSpy = spyOn(component.imgSrc$, 'next');

    component.ngOnInit();

    expect(imgSrcSpy).toHaveBeenCalledWith('src1');
  });

  afterEach(() => {
    window.localStorage.clear();
  });
});
