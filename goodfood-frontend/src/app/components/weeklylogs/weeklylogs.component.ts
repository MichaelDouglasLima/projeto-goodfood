import { Component, ViewChild } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { Diet } from '../../interfaces/Diet';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { WeeklyLogService } from '../../services/weekly-log.service';
import { WeeklylogFormComponent } from '../weeklylog-form/weeklylog-form.component';

@Component({
  selector: 'app-weeklylogs',
  templateUrl: './weeklylogs.component.html',
  styleUrl: './weeklylogs.component.css'
})
export class WeeklylogsComponent {

  @ViewChild(WeeklylogFormComponent) weeklylogFormComponent!: WeeklylogFormComponent;

  weeklyLog: WeeklyLog = {} as WeeklyLog;
  weeklyLogs: WeeklyLog[] = [];
  user: User = {} as User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private weeklyLogService: WeeklyLogService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          this.user = user;
          console.log('User loaded:', this.user); // Log de Depuração
          this.loadWeeklyLogs();
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  loadWeeklyLogs(): void {
    if (this.user.id) {
      this.weeklyLogService.getWeeklyLogs().subscribe({
        next: data => {
          this.weeklyLogs = data.filter(weeklyLog => weeklyLog.user.id === this.user.id);
          console.log('WeeklyLogs loaded:', this.weeklyLogs); // Log de Depuração
        },
        error: err => console.error('Failed to load foods', err)
      });
    } else {
      console.error('User ID not available');
    }
  }

  saveWeeklyLog(): void {
    this.weeklyLogService.save(this.weeklyLog).subscribe({
      next: (savedLog) => {
        this.weeklyLogs.unshift(savedLog);
        this.weeklyLog = {} as WeeklyLog;
      },
      error: (err) => console.error('Erro ao salvar o log semanal:', err)
    });
  }

  resetForm(): void {
    this.weeklyLog = {} as WeeklyLog;
    if (this.weeklylogFormComponent) {
      this.weeklylogFormComponent.resetForm();
    }
  }

}
