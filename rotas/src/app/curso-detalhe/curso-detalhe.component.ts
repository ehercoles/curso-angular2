import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent {
  id: string = '0';

  constructor(private route: ActivatedRoute) {
    console.log(this.route);
    this.id = this.route.snapshot.params['id'];
  }
}
