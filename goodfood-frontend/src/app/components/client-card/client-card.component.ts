import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/Client';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  @Input()
  client!: Client;

}
