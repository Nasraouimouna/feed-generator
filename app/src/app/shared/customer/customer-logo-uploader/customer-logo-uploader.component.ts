import {environment} from '../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadFile, UploadInput, UploaderOptions, UploadOutput, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-customer-logo-uploader',
  templateUrl: './customer-logo-uploader.component.html',
  styleUrls: ['./customer-logo-uploader.component.scss']
})
export class CustomerLogoUploaderComponent implements OnInit {
  @Input() customerId: string;
  @Output() uploadPictureEvent:EventEmitter<boolean> = new EventEmitter();
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humalizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;

  constructor() {
    this.options = { concurrency: 1, maxUploads: 1 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humalizeBytes = humanizeBytes;
  }
  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        this.startUpload();
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        console.log(`%c Logo Uploaded `, 'background-color:tomato;color:white');
        this.uploadPictureEvent.emit(true);
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${environment.API_URL}/api/v1/upload`,
      method: 'POST',
      data: { id: this.customerId,entity:'customer' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  ngOnInit() {
  }

}
