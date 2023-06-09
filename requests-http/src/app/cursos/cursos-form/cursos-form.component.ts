import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cursos2Service } from '../cursos2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //let registro = null;

    /*
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.service.read(id);
        curso$.subscribe(curso => {
          registro = curso;
          this.updateForm(curso);
        })
      }
    )
    */

    //console.log(registro);

    /*
    // route.params: inscrição gerenciada pelo Angular, dispensa unsubscribe
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.read(id))
        //switchMap(aulas => obterAulas)
      )
      .subscribe(curso => this.updateForm(curso));
    */

    // concatMap -> ordem da requisição é importante
    // mergeMap -> ordem não é importante
    // exhasutMap -> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: curso.id,
      nome: [curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }

  /*
  updateForm(curso: any) {
    this.form.patchValue(curso);
  }
  */

  hasError(control: string) {
    return this.form.get(control)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');

      //if (this.form.value.id) { // update (mensagem customizada)

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Curso salvo com sucesso");
          this.router.navigateByUrl("/cursos");
        },
        error => this.modal.showAlertDanger("Erro ao salvar curso"),
        () => console.log('save completo')
      );
    }
  }

  onCancel() {
    this.router.navigateByUrl("/cursos");
  }
}
