import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../../interfaces/Meal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diet-meal-card',
  templateUrl: './diet-meal-card.component.html',
  styleUrl: './diet-meal-card.component.css'
})
export class DietMealCardComponent {

  @Input()
  meal!: Meal;

  @Output() editEmitter = new EventEmitter<Meal>();
  @Output() deleteEmitter = new EventEmitter<Meal>();

  constructor(
    private modalService: NgbModal
  ) {}

  openConfirmModal(modal: any): void {
    this.modalService.open(modal).result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteMeal();
        }
      },
      () => {
        // Handle modal dismiss without confirmation
      }
    );
  }

  editMeal(): void {
    this.editEmitter.emit(this.meal);
  }

  deleteMeal(): void {
    this.deleteEmitter.emit(this.meal);
  }

}
