import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  url = 'http://loiane.com';
  urlImagem = 'https://pbs.twimg.com/profile_images/687354253371772928/v9LlvG5N_400x400.jpg';

  valorAtual :string = '';
  valorSalvo :string = '';

  isMouseOver :boolean = false;

  nomeDoCurso :string = 'Angular';

  getValor() {
    return 1;
  }

  botaoClicado() {
    alert('Botão clicado!');
  }

  onKeyUp(evento :KeyboardEvent) {
    this.valorAtual = (<HTMLInputElement> evento.target).value;
  }

  salvarValor(valor :string) {
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }
}
