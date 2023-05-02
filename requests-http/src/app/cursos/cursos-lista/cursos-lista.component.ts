import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, Subject, catchError, empty } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  cursoSelecionado!: Curso;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

  update(id: number) {
    this.router.navigate(['update', id], { relativeTo: this.route });
  }

  delete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.service.delete(this.cursoSelecionado.id)
      .subscribe(
        success => {
          this.deleteModalRef.hide();
          this.onRefresh();
        },
        error => {
          this.deleteModalRef.hide();
          this.alertService.showAlertDanger('Erro ao remover curso')
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
