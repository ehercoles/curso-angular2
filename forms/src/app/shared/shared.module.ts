import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
