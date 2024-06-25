import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { User } from '../../interfaces/User';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Request } from '../../interfaces/Request';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit {

  clientRequests: Request[] = [];
  nutritionist: User = {} as User;

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadNutritionist();
  }

  loadNutritionist(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: nutritionist => {
          this.nutritionist = nutritionist;
          console.log('Nutritionist loaded:', this.nutritionist); // Log de Depuração
          this.loadClientRequests();
        },
        error: err => console.error('Failed to load nutritionist', err)
      });
    }
  }

  loadClientRequests() {
    if (this.nutritionist.id) {
      this.requestService.getRequests().subscribe({
        next: data => {
          this.clientRequests = data.filter(clientRequest => clientRequest.nutritionist.id === this.nutritionist.id);
          console.log('Client Requests loaded:', this.clientRequests); // Log de Depuração
        },
        error: err => console.error('Failed to load Client Requests', err)
      });
    } else {
      console.error('Nutritionist ID not available');
    }
  }
    
  onClientRequestDeleted(deletedRequest: Request) {
    this.clientRequests = this.clientRequests.filter(request => request.id !== deletedRequest.id);
  }
}
