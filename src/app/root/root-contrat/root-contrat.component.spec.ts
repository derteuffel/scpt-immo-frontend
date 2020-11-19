import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootContratComponent } from './root-contrat.component';

describe('RootContratComponent', () => {
  let component: RootContratComponent;
  let fixture: ComponentFixture<RootContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
