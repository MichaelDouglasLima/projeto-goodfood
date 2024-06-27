import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/User';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-weeklylog-form',
  templateUrl: './weeklylog-form.component.html',
  styleUrl: './weeklylog-form.component.css'
})
export class WeeklylogFormComponent implements OnChanges {

  @Input()
  weeklyLog: WeeklyLog = {} as WeeklyLog;

  @Input()
  clientByDiet: Diet = {} as Diet;

  @Output()
  saveEmitter = new EventEmitter<WeeklyLog | false>();

  formGroupWeeklyLog: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupWeeklyLog = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      rating: ['',],
      weight: ['',],
      endDate: ['',],
      description: ['',],
      diet: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weeklyLog'] && changes['weeklyLog'].currentValue) {
      this.formGroupWeeklyLog.patchValue(this.weeklyLog);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formGroupWeeklyLog.reset({
      id: { value: null, disabled: true },
      rating: '',
      weight: '',
      endDate: '',
      description: '',
      diet: this.clientByDiet,
    });
  }

  save(): void {
    if (this.formGroupWeeklyLog.valid) {
      const formValue = this.formGroupWeeklyLog.getRawValue();
      const weeklyLogToSave = { ...this.weeklyLog, ...formValue };
      this.saveEmitter.emit(weeklyLogToSave);
    }
    this.cancel();
  }

  cancel(): void {
    this.saveEmitter.emit(false);
    this.resetForm();
  }
}
