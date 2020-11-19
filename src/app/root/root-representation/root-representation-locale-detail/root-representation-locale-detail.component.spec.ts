import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleDetailComponent } from './root-representation-locale-detail.component';

describe('RootRepresentationLocaleDetailComponent', () => {
  let component: RootRepresentationLocaleDetailComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
