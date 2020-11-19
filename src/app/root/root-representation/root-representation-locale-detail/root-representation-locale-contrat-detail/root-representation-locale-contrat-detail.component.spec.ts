import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleContratDetailComponent } from './root-representation-locale-contrat-detail.component';

describe('RootRepresentationLocaleContratDetailComponent', () => {
  let component: RootRepresentationLocaleContratDetailComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleContratDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleContratDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleContratDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
