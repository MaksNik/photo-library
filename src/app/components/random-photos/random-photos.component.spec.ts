import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPhotosComponent } from './random-photos.component';

describe('RandomImagesComponent', () => {
  let component: RandomPhotosComponent;
  let fixture: ComponentFixture<RandomPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
