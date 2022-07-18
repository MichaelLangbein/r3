import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAboutComponent } from './route-about.component';

describe('RouteAboutComponent', () => {
  let component: RouteAboutComponent;
  let fixture: ComponentFixture<RouteAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
