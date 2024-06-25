import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { Request } from '../../interfaces/Request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-client-card',
  templateUrl: './request-client-card.component.html',
  styleUrl: './request-client-card.component.css'
})
export class RequestClientCardComponent {

  @Input()
  clientRequest!: Request;

  @Output()
  requestDeleted = new EventEmitter<Request>();

  constructor(
    private modalService: NgbModal,
    private requestService: RequestService
  ) {}

  callClient(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  openRejectModal(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }

  rejectRequest(modal: any) {
    if (this.clientRequest) {
      this.requestService.delete(this.clientRequest).subscribe({
        next: response => {
          console.log('Request deleted successfully:', response);
          this.requestDeleted.emit(this.clientRequest);
          modal.close();
        },
        error: err => {
          console.error('Failed to delete request:', err);
          modal.dismiss();
        }
      });
    } else {
      console.error('No client request to delete');
      modal.dismiss();
    }
  }

}
