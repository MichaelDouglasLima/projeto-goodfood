import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrl: './diet-form.component.css'
})
export class DietFormComponent {
  
  formGroupDietForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupDietForm = this.formBuilder.group({
      typeDiet: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      totalMeals: [''],
      observation: ['']
    });
  }

}
