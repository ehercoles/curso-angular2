import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidation } from '../data-form/form-validation';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService) { }

  onSubmit(formulario: any) {
    console.log(formulario);
    //console.log(this.usuario);

    // URL from resttesttest.com
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  validateControl(control: any) {
    return FormValidation.validateControl(control);
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.validateControl(campo),
      'has-feedback': this.validateControl(campo)
    };
  }

  consultarCep(campoCep: any, form: any) {
    var cep = campoCep.value;

    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultarCep(cep)
        .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados :any, formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }
}
