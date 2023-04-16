import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valor :number = 5;

  excluirCicloFlag :boolean = false;

  mudarValor() {
    this.valor++;
  }

  excluirCiclo() {
    this.excluirCicloFlag = true;
  }
}
