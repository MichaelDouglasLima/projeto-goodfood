import { Pipe, PipeTransform } from '@angular/core';
import { DietStatus } from '../interfaces/enums/DietStatus';

@Pipe({
  name: 'dietStatus'
})
export class DietStatusPipe implements PipeTransform {

  transform(status: DietStatus | undefined): string {
    switch (status) {
      case DietStatus.IN_PROGRESS:
        return 'Em Progresso';
      case DietStatus.FINISHED:
        return 'Terminada';
      case DietStatus.INTERRUPTED:
        return 'Interrompida';
      default:
        return '';
    }
  }

}
