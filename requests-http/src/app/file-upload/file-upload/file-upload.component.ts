import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {

  files!: Set<File>;

  constructor(private service: FileUploadService) { }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    //document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

    const filenames = [];

    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      filenames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel')!.innerHTML = filenames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
        .subscribe(response => console.log('upload done'));
    }
  }
}
