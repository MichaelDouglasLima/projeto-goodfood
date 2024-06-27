import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RealMeal } from '../../interfaces/RealMeal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrl: './history-form.component.css'
})
export class HistoryFormComponent {

  @Input()
  realMeal: RealMeal = {} as RealMeal;

  @Input()
  clientByDiet: Diet = {} as Diet;

  @Output()
  saveEmitter = new EventEmitter<RealMeal>();

  formGroupRealMeal: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupRealMeal = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      registerDate: [''],
      registerTime: [''],
      followedDiet: [null],
      comment: [''],
      nutritionist: [''],
      dietType: [''],
      period: [''],
      diet: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['realMeal'] && changes['realMeal'].currentValue) {
      this.formGroupRealMeal.patchValue(this.realMeal);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formGroupRealMeal.reset({
      id: { value: null, disabled: true },
      registerDate: '',
      registerTime: '',
      followedDiet:  null,
      comment: '',
      nutritionist: this.clientByDiet.nutritionist.name,
      dietType: this.clientByDiet.dietType,
      period: '',
      diet: this.clientByDiet,
    });
  }

  save(): void {
    if (this.formGroupRealMeal.valid) {
      const formValue = this.formGroupRealMeal.getRawValue();
      const realMealToSave = { ...this.realMeal, ...formValue };
      this.saveEmitter.emit(realMealToSave);
    }
  }

  cancel(): void {
    this.saveEmitter.emit();
    this.resetForm();
  }

  onFollowedDietChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.formGroupRealMeal.patchValue({ followedDiet: value === 'true' });
  }
  
}
