import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormValidation } from 'src/app/data-form/form-validation';

///* TODO: delete
@Component({
  selector: 'app-base-form',
  template: '<div></div>' // Não pode ser vazio
})
//*/

export abstract class BaseFormComponent {
  formulario!: FormGroup;

  abstract submit(): any;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario inválido');
      this.validarForm(this.formulario);
    }
  }

  /* Examples of form validation and submission:
  https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
  */
  validarForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.validarForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset;
  }

  validateControl(controlId: string) {
    let control = this.formulario.get(controlId);

    return FormValidation.validateControl(control);
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.validateControl(campo),
      'has-feedback': this.validateControl(campo)
    };
  }
}
