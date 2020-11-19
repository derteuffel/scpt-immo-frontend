import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleContratAddComponent } from './root-representation-locale-contrat-add.component';

describe('RootRepresentationLocaleContratAddComponent', () => {
  let component: RootRepresentationLocaleContratAddComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleContratAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleContratAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleContratAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
