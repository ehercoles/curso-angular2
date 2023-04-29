import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidaEmailService {

  constructor(private http: HttpClient) { }

  validarEmail(email: string) {
    return this.http.get('assets/dados/validaEmail.json')
      .pipe(
        delay(1000),
        map((dados: any) => dados.emails),
        //tap(console.log),
        map((dados: any[]) => dados.filter(v => v.email === email)),
        //tap(console.log),
        map((dados: any[]) => dados.length > 0),
        //tap(console.log)
      );
  }
}
