import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public actions$!: Observable<any>;

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.actions$ = this.backend.getActions();
  }
}
