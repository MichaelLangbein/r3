import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action, BackendService } from './backend.service';


/**
 * Handles the interdependencies of different actions' states.
 */

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private actions$ = new BehaviorSubject<StatefulAction[]>([]);

  constructor(private backendSvc: BackendService) { }

  public getActions(): Observable<StatefulAction[]> {
    return this.actions$;
  }

  public loadActions() {
    this.backendSvc.getActions().subscribe(actions => {
      const statefulActions: StatefulAction[] = actions.map(a => {
        return {
          action: a,
          state: a.dependencies ? 'incomplete' : 'ready'
        }
      });
      this.actions$.next(statefulActions);
    });
  }

  public formFilled(actionId: string, data: any) {
    this.setActionState(actionId, 'running');
    this.backendSvc.executeAction(actionId, data).subscribe((results) => {
      console.log(results);
      this.setActionState(actionId, 'completed');
    });
  }

  private setActionState(id: string, state: ActionState) {
    const actions = this.actions$.value;
    const action = actions.find(a => a.action.id === id);
    if (action) {
      action.state = state;
      const newActions = this.updateStates(actions);
      console.log(newActions)
      this.actions$.next(newActions);
    }
  }

  private updateStates(actions: StatefulAction[]) {
    for (const action of actions) {
      if (action.action.dependencies) {
        let allFulfilled = true;
        for (const dependencyId of action.action.dependencies) {
          const action = actions.find(a => a.action.id === dependencyId)!;
          const state = action.state;
          if (state !== 'completed') allFulfilled = false;
        }
        if (!allFulfilled) action.state = 'incomplete';
        else if (action.state !== 'completed') action.state = 'ready';
      }
    }
    return actions;
  }
}


export type ActionState = 'ready' | 'incomplete' | 'running' | 'completed' | 'error';

export interface StatefulAction {
  action: Action,
  state: ActionState
}