import { Component, Input, OnInit } from '@angular/core';
import { StatefulAction } from 'src/app/services/action.service';


@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @Input() actions: StatefulAction[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
