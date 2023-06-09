import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  
  constructor(private http: HttpClient) { }

  consultarCep(cep: string) {
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      var validaCep = /^[0-9]{8}$/;
      
      if (validaCep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
