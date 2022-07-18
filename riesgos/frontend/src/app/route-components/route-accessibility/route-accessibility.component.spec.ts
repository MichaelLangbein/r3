import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAccessibilityComponent } from './route-accessibility.component';

describe('RouteAccessibilityComponent', () => {
  let component: RouteAccessibilityComponent;
  let fixture: ComponentFixture<RouteAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteAccessibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
