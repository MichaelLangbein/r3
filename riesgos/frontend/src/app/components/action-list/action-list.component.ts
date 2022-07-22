import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/route-components/route-map/route-map.component';



@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @Input() actions: Action[] | null = [];

  constructor() { }

  ngOnInit(): void {}

}
