import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActionService, StatefulAction } from 'src/app/services/action.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input() action!: StatefulAction;
  public form: FormGroup = new FormGroup({});

  constructor(private actionSvc: ActionService) {
  }

  ngOnInit(): void {
    console.log(this.action);
    if (this.action.action.userParas) {
      for (const para of this.action.action.userParas) {
        this.form.addControl(para.label, new FormControl(para.options[0]))
      }
    }
  }

  onSubmit() {
    this.actionSvc.formFilled(this.action.action.id, this.form.value);
  }

}
