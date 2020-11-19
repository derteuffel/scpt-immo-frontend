import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLocaleContratDetailComponent } from './root-locale-contrat-detail.component';

describe('RootLocaleContratDetailComponent', () => {
  let component: RootLocaleContratDetailComponent;
  let fixture: ComponentFixture<RootLocaleContratDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLocaleContratDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLocaleContratDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
