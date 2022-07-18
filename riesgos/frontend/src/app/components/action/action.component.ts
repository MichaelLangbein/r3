import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Action, BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  @Input() action!: Action;
  public form: FormGroup = new FormGroup({});

  constructor(private backendSvc: BackendService) { }

  ngOnInit(): void {
    console.log(this.action);
    if (this.action.userParas) {
      for (const para of this.action.userParas) {
        this.form.addControl(para.label, new FormControl(para.options[0]))
      }
    }
  }

  onSubmit() {
    console.log(this.form.value);
    this.backendSvc.executeAction(this.action.id, this.form.value).pipe().subscribe((response) => {
      console.log(response)
    });
  }

}
