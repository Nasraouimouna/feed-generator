import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPicture } from '../models/picture.model';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient) { }

  uploadPicture(pictureInfo: IPicture, files: Set<File>): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};
    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('picture_title',pictureInfo.picture_title);
      formData.append('owner',pictureInfo.owner);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', `${environment.API_URL}/api/v1/gallery/add`, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  deletePicture(id) {
    return this.httpClient.delete(`${environment.API_URL}/api/v1/gallery/delete/${id}`) as Observable<IApiResponse>;;
  }


  getAllPictures() {
    return this.httpClient.get(`${environment.API_URL}/api/v1/gallery`) as Observable<IApiResponse>;
  }

  getPictureById(id) {
    return this.httpClient.get(`${environment.API_URL}/api/v1/gallery/${id}`) as Observable<IApiResponse>;
  }

  getPictureByOwnerId(id) {
    return this.httpClient.get(`${environment.API_URL}/api/v1/gallery/owner/${id}`) as Observable<IApiResponse>;
  }
}
