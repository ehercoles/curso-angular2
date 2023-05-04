import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})

export class LibSearchComponent {

  queryControl = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;

  constructor(private http: HttpClient) { }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryControl.value;

    if (value && (value = value.trim()) !== '') {

      /*
      const params = {
        search: value,
        fields: fields
      };
      */

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total),
          map(res => res.results)
        )
    }
  }
}
