import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { User } from '../../interfaces/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  // @Input()
  // client!: Client;

  @Input()
  client!: User;

  // client: User = {
  //   id: 1,
  //   name: 'Alan',
  //   email: 'alan@example.com',
  //   username: 'alan123',
  //   password: 'password',
  //   phoneNumber: '1532385263',
  //   description: 'Description about Alan',
  //   birthDate: '1990-01-01',
  //   gender: Gender.MALE,
  //   role: Role.CLIENT,
  //   height: 175,
  //   weight: 70,
  //   cfn: '123456789'
  // };

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  callClient(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

}
