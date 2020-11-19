import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootContratUpdateComponent } from './root-contrat-update.component';

describe('RootContratUpdateComponent', () => {
  let component: RootContratUpdateComponent;
  let fixture: ComponentFixture<RootContratUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootContratUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootContratUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
