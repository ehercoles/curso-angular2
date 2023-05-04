import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})

export class LibSearchComponent implements OnInit {

  queryControl = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryControl.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        //tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results));
      //.subscribe(); // switchMap dispensa inscrição
  }
  
  onSearch() {
    let value = this.queryControl.value;

    if (value && (value = value.trim()) !== '') {
      //const params = { search: value, fields: fields };
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total),
          map(res => res.results)
        )
    }
  }
}
