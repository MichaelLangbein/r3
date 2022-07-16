import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  public getSteps() {
    return this.http.get(this.backendUrl + "/actions");
  }

  public userInput(actionId: string, data: any) {
    this.http.post(this.backendUrl + "/actions/" + actionId, data);
  }
}
