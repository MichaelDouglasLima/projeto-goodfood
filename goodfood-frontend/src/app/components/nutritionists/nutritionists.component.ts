import { Component, OnInit } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../../services/request.service';
import { Request } from '../../interfaces/Request';

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrl: './nutritionists.component.css'
})
export class NutritionistsComponent implements OnInit {

  nutritionists: User[] = [];
  client: User = {} as User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private requestService: RequestService
  ) { }

  // open(content: any) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  ngOnInit() {
    this.loadNutritionists();
    this.loadClient();
  }

  loadNutritionists() {
    this.userService.getUsers().subscribe({
      next: data => {
        this.nutritionists = data.filter(nutritionist => nutritionist.role === Role.NUTRITIONIST);
        console.log('Nutritionists loaded:', this.nutritionists); // Log de Depuração
      },
      error: err => console.error('Failed to load foods', err)
    });
  }

  loadClient(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: client => {
          this.client = client;
          console.log('Client loaded:', this.client); // Log de Depuração
          this.loadNutritionists();
        },
        error: err => console.error('Failed to load client', err)
      });
    }
  }

}
