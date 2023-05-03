import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
  
  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    //document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

    const filenames = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      filenames.push(selectedFiles[i].name);
    }

    document.getElementById('customFileLabel')!.innerHTML = filenames.join(', ');
  }
}
