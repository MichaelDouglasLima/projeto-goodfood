import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../interfaces/Meal';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnChanges {

  @Input()
  meal: Meal = {} as Meal;

  @Input()
  clientByDiet: Diet = {} as Diet;

  @Output()
  saveEmitter = new EventEmitter<Meal | false>();

  formGroupMeal: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupMeal = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      period: [''],
      estimatedTime: [''],
      comment: [''],
      diet: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meal'] && changes['meal'].currentValue) {
      this.formGroupMeal.patchValue(this.meal);
    } else {
      this.resetForm();
    }

    if (changes['clientByDiet'] && changes['clientByDiet'].currentValue) {
      this.formGroupMeal.get('diet')?.setValue(this.clientByDiet);
    }
  }

  resetForm(): void {
    this.formGroupMeal.reset({
      id: { value: null, disabled: true },
      period: '',
      estimatedTime: '',
      comment: '',
      diet: this.clientByDiet,
    });
  }

  save(): void {
    if (this.formGroupMeal.valid) {
      const formValue = this.formGroupMeal.getRawValue();
      const mealToSave = { ...this.meal, ...formValue, diet: this.clientByDiet };
      console.log(mealToSave);
      this.saveEmitter.emit(mealToSave);
    }
    this.cancel();
  }

  cancel(): void {
    this.saveEmitter.emit(false);
    this.resetForm();
  }

}