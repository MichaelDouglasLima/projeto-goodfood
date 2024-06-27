import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { Request } from '../../interfaces/Request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../../services/request.service';
import { DietService } from '../../services/diet.service';
import { Diet } from '../../interfaces/Diet';
import { DietStatus } from '../../interfaces/enums/DietStatus';

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
    private requestService: RequestService,
    private dietService: DietService
  ) { }

  callClient(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  openAcceptModal(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }

  openRejectModal(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }

  acceptRequest(modal: any) {
    const clientId = this.clientRequest.client.id;
    const nutritionistId = this.clientRequest.nutritionist.id;

    // Verifica se o cliente já possui uma dieta
    this.dietService.getDiets().subscribe(diets => {
      const existingDiet = diets.find(diet => diet.client.id === clientId);

      if (existingDiet) {
        // Atualiza a dieta existente
        existingDiet.nutritionist.id = nutritionistId; // Atualiza com os dados do nutricionista
        this.dietService.update(existingDiet).subscribe({
          next: response => {
            console.log('Diet updated successfully:', response);
            this.deleteRequestAfterAccepting(modal);
          },
          error: err => {
            console.error('Failed to update diet:', err);
            modal.dismiss();
          }
        });
      } else {
        // Cria uma nova dieta apenas se não existir uma para o cliente
        const newDiet: Diet = {
          //  id: 0
          dietType: '',
          startDate: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
          // endDate: new Date().toISOString().split('T')[0], // Defina um valor apropriado ou deixe como null se não for obrigatório
          // status: DietStatus.IN_PROGRESS
          totalMeals: 0,
          observation: '',
          client: this.clientRequest.client,
          nutritionist: this.clientRequest.nutritionist
        };

        this.dietService.save(newDiet).subscribe({
          next: response => {
            console.log('Diet created successfully:', response);
            this.deleteRequestAfterAccepting(modal);
          },
          error: err => {
            console.error('Failed to create diet:', err);
            modal.dismiss();
          }
        });
      }
    }, error => {
      console.error('Failed to fetch diets:', error);
      modal.dismiss();
    });
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

  private deleteRequestAfterAccepting(modal: any) {
    this.requestService.delete(this.clientRequest).subscribe({
      next: response => {
        console.log('Request deleted successfully after accepting:', response);
        this.requestDeleted.emit(this.clientRequest);
        modal.close();
      },
      error: err => {
        console.error('Failed to delete request after accepting:', err);
        modal.dismiss();
      }
    });
  }

}
