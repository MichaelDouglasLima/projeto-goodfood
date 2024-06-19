import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weeklylog-form',
  templateUrl: './weeklylog-form.component.html',
  styleUrl: './weeklylog-form.component.css'
})
export class WeeklylogFormComponent  implements OnChanges {

  @Input()
  weeklyLog: WeeklyLog = {} as WeeklyLog;

  @Output()
  saveEmitter =  new EventEmitter();

  formGroupWeeklyLog: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupWeeklyLog = this.formBuilder.group({
      id: {value:null, disabled:true},
      rating: ['', ],
      weight: ['', ],
      endDate: ['', ],
      description: ['', ],
      diet: ['',]
    })
  }

  save() {
    if (this.formGroupWeeklyLog.valid) {
      Object.assign(this.weeklyLog, this.formGroupWeeklyLog.value);
      this.saveEmitter.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weeklyLog'] && changes['weeklyLog'].currentValue) {
      this.formGroupWeeklyLog.patchValue(this.weeklyLog);
    }
  }
  
  // ngOnChanges(): void {
  //   if (this.weeklyLog.id) {
  //     this.formGroupWeeklyLog.setValue(this.weeklyLog);
  //   }
  // }

}
