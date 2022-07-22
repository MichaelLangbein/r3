import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private graph$: BehaviorSubject<Graph> = new BehaviorSubject<Graph>({
    processes: [],
    products: []
  });

  constructor(private http: HttpClient) { }

  public getGraph(): Observable<Graph> {
    if (this.graph$.value.processes.length === 0) {
      this.http.get("http://localhost:5000/graph", {withCredentials: true}).pipe(map((d: any) => d.graph)).subscribe((graph: Graph) => {
        this.graph$.next(graph);
      });
    };
    return this.graph$;
  }

  public getInfo(): Observable<AppInfo> {
    return this.http.get<{info: AppInfo}>("http://localhost:5000/info").pipe(map(i => i.info));
  }

  public executeAction(actionId: string, data: any) {
    const requestOptions = {
      withCredentials: true,
      headers: {  
          'Content-Type': 'application/json'
      }
    };
    this.http.post<{"graph": Graph}>(`http://localhost:5000/actions/${actionId}`, data, requestOptions)
      .subscribe((data) => {
        this.graph$.next(data.graph);
    });
  }
}


export interface AppInfo {
  aoi: [number, number, number, number];
}

export interface Process {
  id: string,
  title: string,
  description: string,
  provides: string[],
  requires: string[],
  state: string,
}

export interface Product {
  id: string,
  data: any,
  display?: string,
  options?: string[]
}

export interface Graph {
  processes: Process[],
  products: Product[]
}
