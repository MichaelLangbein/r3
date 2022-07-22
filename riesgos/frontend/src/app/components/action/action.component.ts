import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService, Process } from 'src/app/services/backend.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input() action!: Process;
  public form: FormGroup = new FormGroup({});

  constructor(private backendSvc: BackendService) {
  }

  ngOnInit(): void {
    // if (this.action.userParas) {
    //   for (const para of this.action.userParas) {
    //     this.form.addControl(para.label, new FormControl(para.options[0]))
    //   }
    // }
  }

  onSubmit() {
    this.backendSvc.executeAction(this.action.id, {});
  }

}
