import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Remover todos os caracteres não numéricos
    let cleaned = ('' + value).replace(/\D/g, '');

    // Verificar o comprimento do número
    let match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
  }

}
