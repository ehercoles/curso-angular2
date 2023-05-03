import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {

  files!: Set<File>;
  progress = 0;

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

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      // Undo: Aula 138
      // No Angular '/api' não é rota, é chamada de back-end
      //this.service.upload(this.files, '/api/upload')
      this.service.upload(this.files, environment.BASE_URL + 'upload')
        .pipe(
          uploadProgress(progress => {
            console.log(this.progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('upload done'));
        /*
        .subscribe((event: HttpEvent<Object>) => {
          //console.log(event);

          if (event.type === HttpEventType.Response) {
            console.log('upload done');
          } else if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded * 100) / (event.total ?? 1));
            //console.log('Progresso', this.progress);
          }
        });
        */
    }
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + 'downloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, '1.xlsx');
      });
  }

  onDownloadPdf() {
    this.service.download(environment.BASE_URL + 'downloadPdf')
      .subscribe((res: any) => {
        this.service.handleFile(res, '1.pdf');
      });
  }
}
