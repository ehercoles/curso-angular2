import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertModalComponent],
  /*  entryComponents são instanciados em tempo de execução,
      sem referência em template ou roteamento */
  entryComponents: [AlertModalComponent]
})

export class SharedModule { }
