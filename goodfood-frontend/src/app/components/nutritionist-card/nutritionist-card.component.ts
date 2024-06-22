import { Component, Input } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-nutritionist-card',
  templateUrl: './nutritionist-card.component.html',
  styleUrl: './nutritionist-card.component.css'
})
export class NutritionistCardComponent {

  // @Input()
  // nutritionist!: Nutritionist;

  @Input()
  nutritionist!: User;

  callNutri(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

}
