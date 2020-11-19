import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootContratDetailComponent } from './root-contrat-detail.component';

describe('RootContratDetailComponent', () => {
  let component: RootContratDetailComponent;
  let fixture: ComponentFixture<RootContratDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootContratDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootContratDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
