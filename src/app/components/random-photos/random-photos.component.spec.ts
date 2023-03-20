import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RandomPhotosComponent } from './random-photos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PhotoService} from "../../services/photo.service";
import {Observable, of} from "rxjs";
import {IImageData} from 'src/app/models/types';
import {PhotosListComponent} from "../shared/photos-list/photos-list.component";

const mockedEntries = [
  {
    isIntersecting: true,
  },
];

class MockIntersectionObserver {
  observe: () => void;
  unobserve: () => void;
  disconnect: () => void;
  fire: () => void;

  constructor(
    public callback: (entries: Array<IntersectionObserverEntry>) => void
  ) {
    this.observe = jasmine.createSpy('observe');
    this.unobserve = jasmine.createSpy('unobserve');
    this.disconnect = jasmine.createSpy('disconnect');
    this.fire = () => {
      this.callback(mockedEntries as IntersectionObserverEntry[]);
    }
  }
}

describe('RandomPhotosComponent', () => {
  let component: RandomPhotosComponent;
  let fixture: ComponentFixture<RandomPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomPhotosComponent],
      providers: [PhotoService],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RandomPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'loadMoreImages\' on anchor intercept', () => {
    (window as any).IntersectionObserver = MockIntersectionObserver;
    const loadMoreSpy = spyOn(component as any, 'loadMoreImages');

    component.ngOnInit();
    (component['observer'] as any)?.fire();

    expect(loadMoreSpy).toHaveBeenCalledTimes(2);
  });

  describe('\'loadMoreImages\' method', () => {
    const mockImagesList = [
      {id: '1', imgSrc: 'src1'},
      {id: '2', imgSrc: 'src2'},
      {id: '3', imgSrc: 'src3'},
    ];

    let loadImagesSpy: jasmine.Spy<(count: number) => Observable<IImageData[]>>;

    beforeEach(() => {
      loadImagesSpy = spyOn(component['photoService'], 'loadImages').and.returnValue(of(mockImagesList));
    })

    it('should trigger PhotoService \'loadImages\' method', () => {
      component['loadMoreImages']();
      expect(loadImagesSpy).toHaveBeenCalled();
    });

    it('should show spinner on loading start', () => {
      const isLoadingSpy = spyOn(component.isLoading$, 'next');
      component['loadMoreImages']();
      expect(isLoadingSpy).toHaveBeenCalledWith(true);
    });

    it('should hide spinner on loading end', fakeAsync(() => {
      const isLoadingSpy = spyOn(component.isLoading$, 'next');
      component['loadMoreImages']();
      tick();
      expect(isLoadingSpy).toHaveBeenCalledWith(false);
    }));

    it('should add new photos to existing array', fakeAsync(() => {
      const photosSubjectSpy = spyOn(component.photos$, 'next');
      component['loadMoreImages']();
      tick();
      expect(photosSubjectSpy).toHaveBeenCalledWith(mockImagesList);
    }));
  });
});
