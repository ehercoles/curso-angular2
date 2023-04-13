import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  url = 'http://loiane.com';
  urlImagem = 'https://pbs.twimg.com/profile_images/687354253371772928/v9LlvG5N_400x400.jpg';

  getValor() {
    return 1;
  }
}
