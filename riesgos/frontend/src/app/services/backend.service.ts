import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public getActions(): Observable<Action[]> {
    return this.http.get("http://localhost:5000/actions").pipe(map((d: any) => d.data));
  }

  public getInfo(): Observable<AppInfo> {
    return this.http.get<AppInfo>("http://localhost:5000/info");
  }

  public executeAction(actionId: string, data: any) {
    this.http.post(`http://localhost:5000/actions/${actionId}`, data);
  }
}


export interface AppInfo {
  aoi: [number, number, number, number];
}

export interface Action {
  id: string,
  title: string,
  description: string,
  userParas?: UserPara[],
  dependencies?: string[]
}

export interface UserPara {
  label: string,
  options: string[]
}