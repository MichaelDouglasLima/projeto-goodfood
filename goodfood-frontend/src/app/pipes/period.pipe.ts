import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'BREAKFAST': return 'Café da Manhã';
      case 'LUNCH': return 'Almoço';
      case 'DINNER': return 'Jantar';
      case 'SNACK': return 'Lanche';
      default: return value;
    }
  }
}
