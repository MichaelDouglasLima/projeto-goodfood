import { Pipe, PipeTransform } from '@angular/core';
import { DietStatus } from '../interfaces/enums/DietStatus';

@Pipe({
  name: 'dietStatus'
})
export class DietStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'IN_PROGRESS': return 'Em Progresso';
      case 'FINISHED': return 'Terminada';
      case 'INTERRUPTED': return 'Interrompida';
      default: return value;
    }
  }

}
