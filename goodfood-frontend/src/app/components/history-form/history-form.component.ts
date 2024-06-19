import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RealMeal } from '../../interfaces/RealMeal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrl: './history-form.component.css'
})
export class HistoryFormComponent {

  @Input()
  realMeal: RealMeal = {} as RealMeal;

  @Output()
  saveEmitter =  new EventEmitter();

  formGroupRealMeal: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupRealMeal = this.formBuilder.group({
      id: {value:null, disabled:true},
      registerDate: ['', ],
      registerTime: ['', ],
      followedDiet: ['', ],
      diet: ['', ]
    })
  }

  save() {
    if (this.formGroupRealMeal.valid) {
      Object.assign(this.realMeal, this.formGroupRealMeal.value);
      this.saveEmitter.emit();
    }
  }
}
