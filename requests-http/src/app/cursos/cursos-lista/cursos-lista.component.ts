import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true // Espaço entre botões (&nbsp;)
})

export class CursosListaComponent implements OnInit {
  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef!: BsModalRef;

  constructor(
    private service: CursosService,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    //this.service.list().subscribe(dados => this.cursos = dados);
    
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
    
    /*
    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados);
        },
        error => console.error(error),
        () => console.log('Observable completo')
      );
      */
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos');
  }
}
