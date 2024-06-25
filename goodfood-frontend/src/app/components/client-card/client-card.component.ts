import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { User } from '../../interfaces/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  // @Input()
  // client!: Client;

  @Input()
  clientByDiet!: Diet;

  @Input()
  client!: User;

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  callClient(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

}
