import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTermsOfUseComponent } from './route-terms-of-use.component';

describe('RouteTermsOfUseComponent', () => {
  let component: RouteTermsOfUseComponent;
  let fixture: ComponentFixture<RouteTermsOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteTermsOfUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
