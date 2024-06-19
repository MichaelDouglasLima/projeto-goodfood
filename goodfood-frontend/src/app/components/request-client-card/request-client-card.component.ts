import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/Client';

@Component({
  selector: 'app-request-client-card',
  templateUrl: './request-client-card.component.html',
  styleUrl: './request-client-card.component.css'
})
export class RequestClientCardComponent {

  @Input()
  client!: Client;

}
