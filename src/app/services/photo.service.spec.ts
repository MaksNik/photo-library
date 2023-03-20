import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PhotoService } from './photo.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of image data', fakeAsync(() => {
    spyOn(service as any, 'getImage').and.returnValue(of(
      'base64EncodedImage'
    ));

   service.loadImages(3).subscribe((values) => {
     tick();
     expect(values.length).toBe(3);
     expect(values instanceof Array).toBe(true);
     expect(values.every((value) => value.imgSrc === 'base64EncodedImage')).toBe(true);
   })
  }))
});
