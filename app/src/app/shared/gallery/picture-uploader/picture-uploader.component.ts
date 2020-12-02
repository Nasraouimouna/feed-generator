
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { GalleryService } from '../gallery.service';
import { IApiResponse } from '../../models/api-response.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: ['./picture-uploader.component.scss']
})
export class PictureUploaderComponent implements OnInit {
  pictureUploadForm: FormGroup;

  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;


  constructor(
    public dialogRef: MatDialogRef<PictureUploaderComponent>,
    private formBuilder: FormBuilder,
    private galleryService: GalleryService
  ) { }


  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.pictureUploadForm = this.formBuilder.group({
      picture_title: ['', Validators.required],
      owner: [user._id]
    })
  }

  addFile() {
    this.file.nativeElement.click();
  }

  onFileAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }
 
  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.galleryService.uploadPicture(this.pictureUploadForm.value, this.files);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
