import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static mayorQue(startControl: AbstractControl | null): ValidatorFn {
    return (endControl: AbstractControl | null): ValidationErrors | null => {
      if (endControl == null || startControl == null) {
        return null;
      }
      const startDate: Date = startControl.value;
      const endDate: Date = endControl.value;

      if (!startDate || !endDate) {
        return null;
      }

      if (startDate >= endDate) {
        return { mayorQue: true };
      }
      return null;
    };
  }
}
