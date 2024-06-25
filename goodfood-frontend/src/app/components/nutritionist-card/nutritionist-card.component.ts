import { Component, Input } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../../services/request.service';

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

  @Input()
  client!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService,
    private modalService: NgbModal
  ) { }

  callNutri(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  openContractModal(modal: any, nutritionist: User) {
    this.modalService.open(modal, { size: 'lg' });
  }

  sendRequest(modal: any) {
    const request = {
      client: this.client,
      nutritionist: this.nutritionist
    };

    this.requestService.save(request).subscribe({
      next: response => {
        console.log('Request sent successfully:', response);
        modal.close();
      },
      error: err => {
        console.error('Failed to send request:', err);
        modal.dismiss();
      }
    });
  }

}
