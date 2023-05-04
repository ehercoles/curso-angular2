import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})

export class LibSearchComponent {

  queryControl = new FormControl();

  onSearch() {
    console.log(this.queryControl.value);
  }
}
