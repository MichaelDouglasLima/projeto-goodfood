import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Food } from '../../interfaces/Food';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../interfaces/Category';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-pantry-form',
  templateUrl: './pantry-form.component.html',
  styleUrl: './pantry-form.component.css'
})
export class PantryFormComponent {

  @Input() categories: Category[] = [];
  @Input() food: Food = {} as Food;
  @Input() user: User = {} as User;
  @Output() saveEmitter = new EventEmitter<Food | false>();

  formGroupFood: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupFood = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      description: ['',],
      calories: ['', ],
      category: [null,],
      user: [null] // Incluindo o usuário no FormGroup
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food'] && changes['food'].currentValue) {
      this.formGroupFood.patchValue({
        ...this.food,
        user: this.user // Garantindo que o usuário também é atualizado
      });
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formGroupFood.reset({
      id: { value: null, disabled: true },
      description: '',
      calories: '',
      category: null,
      user: this.user // Incluindo o usuário ao resetar o formulário
    });
  }

  save(): void {
    if (this.formGroupFood.valid) {
      const formValue = this.formGroupFood.getRawValue();
      console.log('Form value before save:', formValue);

      // Merge form values into the existing food object
      const foodToSave = {
        ...this.food,
        ...formValue
      };

      console.log('Food to save after merge:', foodToSave);
      this.saveEmitter.emit(foodToSave);
    }

    this.cancel();
  }
  
  cancel(): void {
    this.saveEmitter.emit(false);
    this.resetForm();
  }

  selectedCategory(category1: Category, category2: Category) {
    return category1 && category2 ? category1.id === category2.id : false;
  }

  get ffgDescription() { return this.formGroupFood.get("description"); }
  get ffgCalories() { return this.formGroupFood.get("calories"); }
  get ffgCategory() { return this.formGroupFood.get("category"); }
}
