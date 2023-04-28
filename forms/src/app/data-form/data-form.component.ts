import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from './../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { FormValidation } from './form-validation';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados!: EstadoBr[];
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];
  frameworks!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService) { }

  ngOnInit() {

    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);
    
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();
    this.frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

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
        cep: [null, [Validators.required, Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)]],
        numero: [null, [Validators.required]],
        complemento: [],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }),
      
      cargo: [],
      tecnologias: [],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidation.validateMinCheckedCheckboxes(1));
  }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: boolean, i: number) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    if (this.formulario.valid) {
      // URL from resttesttest.com
      this.http.post(
          'https://httpbin.org/post',
          JSON.stringify(valueSubmit))
        .subscribe({
          next: (dados) => {
            console.log(dados);
            //this.resetar();
          },
          error: (error: any) => alert('erro')
        });
    } else {
      console.log('formulario inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
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

  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados :any) {
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  /* Compara as propriedades do objeto além da referência em memória
  para o Angular conseguir setar corretamente no método setarCargo */
  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ?
      (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) :
      obj1 && obj2
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }
}
