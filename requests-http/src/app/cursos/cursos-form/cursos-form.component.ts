import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';

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
    private service: CursosService,
    private modal: AlertModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]]
    });
  }

  hasError(control: string) {
    return this.form.get(control)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Curso criado com sucesso");
          this.router.navigate(["/cursos"]);
        },
        error => this.modal.showAlertDanger("Erro ao criar curso"),
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
