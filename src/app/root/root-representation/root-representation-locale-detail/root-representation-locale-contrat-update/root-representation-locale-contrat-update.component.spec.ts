import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleContratUpdateComponent } from './root-representation-locale-contrat-update.component';

describe('RootRepresentationLocaleContratUpdateComponent', () => {
  let component: RootRepresentationLocaleContratUpdateComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleContratUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleContratUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleContratUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
