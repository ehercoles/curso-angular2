import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    /*
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });
    */

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      })
    });
  }

  onSubmit() {
    console.log(this.formulario);

    // URL from resttesttest.com
    this.http.post(
        'https://httpbin.org/post',
        JSON.stringify(this.formulario.value))
      .subscribe({
        next: (dados) => {
          console.log(dados);
          //this.resetar();
        },
        error: (error: any) => alert('erro')
      });
  }

  resetar() {
    this.formulario.reset;
  }

  verificaValidTouched(campo: string) {
    let campoControl = this.formulario.get(campo);

    return !campoControl?.valid && campoControl?.touched;
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value;

    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      var validaCep = /^[0-9]{8}$/;
      
      if (validaCep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados, this.formulario));
      }
    }
  }

  populaDadosForm(dados :any, formulario: any) {
    this.formulario.patchValue({
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
