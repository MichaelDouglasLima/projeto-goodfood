import { Component, Input } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-weeklylog-card',
  templateUrl: './weeklylog-card.component.html',
  styleUrl: './weeklylog-card.component.css'
})
export class WeeklylogCardComponent {

  @Input()
  weeklyLog!: WeeklyLog;

}
