import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/services/backend.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @Input() actions: Action[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
