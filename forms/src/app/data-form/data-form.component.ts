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
      email: [null, [Validators.required, Validators.email]]
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
}
