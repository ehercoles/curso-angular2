import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent {

  livro: any = {
    titulo: "Título Livro",
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glgjpRP'
  };

  livros: string[] = ['Java', 'Angular 2'];

  filtro: string = '';

  addCurso(valor: string) {
    this.livros.push(valor);
  }

  obterCursos() {
    if (this.livros.length === 0 || 
      this.filtro === null || 
      this.filtro.trim() === '') {

      return this.livros;
    }

    return this.livros.filter((v) => {
      return (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0);
    });
  }
}
