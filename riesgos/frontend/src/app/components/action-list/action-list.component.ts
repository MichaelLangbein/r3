import { Component, Input, OnInit } from '@angular/core';
import { Process } from 'src/app/services/backend.service';


@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  @Input() actions: Process[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
