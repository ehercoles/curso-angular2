import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidation } from 'src/app/data-form/form-validation';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  //@Input() mostraErro?: boolean = false;
  //@Input() msgErro: string = '';
  @Input() control!: FormControl;
  @Input() label!: string;

  ngOnInit() {
    
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)
        && this.control.touched) {

        return FormValidation.getErrorMessage(
          this.label,
          propertyName,
          this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
