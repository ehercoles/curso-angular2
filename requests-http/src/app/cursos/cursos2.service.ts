import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Cursos2Service extends CrudService<Curso> {

  constructor(override http: HttpClient) {
    super(http, `${ environment.API }cursos`);
  }
}
