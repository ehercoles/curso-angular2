import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css'],
  //outputs: ['mudouValor']
})
export class OutputPropertyComponent {
  @Input() valor :number = 0;
  @Output() mudouValor = new EventEmitter();
  @ViewChild('campoInput') campoValorInput! :ElementRef;

  decrementa() {
    //this.valor--;
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({ novoValor :this.valor});
  }

  incrementa() {
    //this.valor++;
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({ novoValor :this.valor});
  }
}
