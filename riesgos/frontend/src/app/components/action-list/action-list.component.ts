import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @Input() actions: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
