import { Component, Input } from '@angular/core';
import { RealMeal } from '../../interfaces/RealMeal';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.css'
})
export class HistoryCardComponent {

  @Input()
  realMeal!: RealMeal;
  
}
