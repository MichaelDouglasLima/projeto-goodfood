import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../interfaces/enums/Unit';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'UNIT': return 'unidade';
      case 'GRAMS': return 'g';
      case 'LITERS': return 'ml';
      default: return value;
    }
  }

}