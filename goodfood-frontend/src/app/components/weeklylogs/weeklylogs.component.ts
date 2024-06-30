import { Component, OnInit, ViewChild } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { Diet } from '../../interfaces/Diet';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { WeeklyLogService } from '../../services/weekly-log.service';
import { WeeklylogFormComponent } from '../weeklylog-form/weeklylog-form.component';
import { DietService } from '../../services/diet.service';

@Component({
  selector: 'app-weeklylogs',
  templateUrl: './weeklylogs.component.html',
  styleUrl: './weeklylogs.component.css'
})
export class WeeklylogsComponent implements OnInit{

  @ViewChild(WeeklylogFormComponent) weeklylogFormComponent!: WeeklylogFormComponent;

  weeklyLogs: WeeklyLog[] = [];
  weeklyLog: WeeklyLog = {} as WeeklyLog;
  clientByDiet: Diet = {} as Diet;
  client: User = {} as User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dietService: DietService,
    private weeklyLogService: WeeklyLogService
  ) { }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    const clientId = this.authService.getUserId();
    if (clientId) {
      this.userService.getUserById(clientId).subscribe({
        next: client => {
          this.client = client;
          console.log('Client loaded:', this.client); // Log de Depuração
          this.loadDietByClientId(clientId);
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  loadDietByClientId(clientId: number): void {
    this.dietService.getDiets().subscribe({
      next: diets => {
        const clientDiet = diets.find(diet => diet.client.id === +clientId);
        if (clientDiet) {
          this.clientByDiet = clientDiet;
          console.log('Client Diet loaded:', this.clientByDiet);
          this.loadWeeklyLogs();
        } else {
          console.error('Client Diet not found for client ID:', clientId);
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
      }
    });
  }

  loadWeeklyLogs(): void {
    if (this.clientByDiet.id) {
      this.weeklyLogService.getWeeklyLogs().subscribe({
        next: data => {
          this.weeklyLogs = data.filter(weeklyLog => weeklyLog.diet.id === this.clientByDiet.id);
          console.log('WeeklyLogs loaded:', this.weeklyLogs); // Log de Depuração
          this.sortWeeklyLogs();
        },
        error: err => console.error('Failed to load weeklylogs', err)
      });
    } else {
      console.error('ClientByDiet ID not available');
    }
  }

  saveWeeklyLog(weeklyLog: WeeklyLog | false): void {
    if (weeklyLog) {
        this.weeklyLogService.save(weeklyLog).subscribe({
          next: weeklyLog => {
            this.weeklyLogs.push(weeklyLog);
            this.resetForm();
            this.loadWeeklyLogs();
          },
          error: err => console.error('Failed to save weeklyLog', err)
        });
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.weeklyLog = {} as WeeklyLog;
    if (this.weeklylogFormComponent) {
      this.weeklylogFormComponent.resetForm();
    }
  }

  sortWeeklyLogs(): void {
    this.weeklyLogs.sort((a, b) => {
      if (!a.endDate) return 1;  // Registros com data nula vão para o final
      if (!b.endDate) return -1; // Registros com data nula vão para o final
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime(); // Ordena do mais recente para o mais antigo
    });
  }

}
