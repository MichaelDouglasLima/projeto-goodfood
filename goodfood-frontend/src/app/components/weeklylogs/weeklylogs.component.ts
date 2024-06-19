import { Component } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { WeeklylogService } from '../../services/weeklylog.service';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-weeklylogs',
  templateUrl: './weeklylogs.component.html',
  styleUrl: './weeklylogs.component.css'
})
export class WeeklylogsComponent {

  weeklyLog: WeeklyLog = {} as WeeklyLog;

  weeklyLogs: WeeklyLog[] = [];

  constructor (private weeklyLogService: WeeklylogService) {}

  ngOnInit(): void {
    this.weeklyLogs = this.weeklyLogService.getWeeklyLogs();
  }

  saveWeeklyLog() {
    this.weeklyLogService.save(this.weeklyLog);
    this.weeklyLog = {} as WeeklyLog;
  }


  // saveRealMeal(): void {
  //   this.weeklyLogService.save(this.weeklyLog).subscribe({
  //     next: (data) => {
  //       this.weeklyLogs.push(data);
  //       this.weeklyLog = {} as WeeklyLog;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao salvar o log semanal:', err);
  //     }
  //   });
  // }

}
