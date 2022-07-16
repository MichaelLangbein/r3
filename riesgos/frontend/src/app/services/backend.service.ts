import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public getActions() {
    return this.http.get("http://localhost:5000/actions").pipe(map((d: any) => d.data));
  }

  public executeAction(actionId: string, data: any) {
    this.http.post(`http://localhost:5000/actions/${actionId}`, data);
  }
}
