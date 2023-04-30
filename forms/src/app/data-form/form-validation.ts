import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class FormValidation {
    static validateMinCheckedCheckboxes(min: number = 1) {
        const validator: ValidatorFn = (formArray: AbstractControl) => {
          if (formArray instanceof FormArray) {
            const totalChecked = formArray.controls
              .map((control) => control.value)
              .reduce((prev, next) => (next ? prev + next : prev), 0);
            
            return totalChecked >= min ? null : { required : true };
          }
    
          throw new Error('formArray is not an instance of FormArray');
        };
    
        return validator;
    }
    
    // Depreciado: vide método validateMinCheckedCheckboxes
    private requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            /* Programação estruturada
            const values = formArray.controls;
            let totalChecked = 0;

            for (let i = 0; i < values.length; i++) {
                if (values[i].value) {
                    totalChecked++;
                }
            }
            */

            // Programação funcional
            const totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);

            return totalChecked >= min ? null : { required : true };
        };

        return validator;
    }

    static validateControl(control: any) {
        return !control?.valid
          && (control?.touched || control?.dirty);
    }

    static equalsTo(controlId: string) {
        const validator = (formControl: FormControl) => {
          if (controlId == null) {
            throw new Error('É necessário informar um campo');
          }
    
          if (!formControl.root || !(<FormGroup>formControl.root).controls) {
            return null;
          }
    
          const control = (<FormGroup>formControl.root).get(controlId);
    
          if (!control) {
            throw new Error('É necessário informar um campo válido');
          }
    
          if (control.value !== formControl.value) {
            return { equalsTo : true };
          }
    
          return null;
        };

        return validator;
    }

    static getErrorMessage(
      controlDesc: string,
      validatorId: string,
      validatorValue?: any) {

      let config: {[key: string]: string};

      config = {
        'required': `${controlDesc} é obrigatório`,
        'minlength': `${controlDesc} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
        'maxlength': `${controlDesc} precisa ter no máximo ${validatorValue.requiredLength} caracteres`,
        'equalsTo': `${controlDesc} divergente`
      }

      return config[validatorId];
    }
}
