import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLocaleDetailComponent } from './root-locale-detail.component';

describe('RootLocaleDetailComponent', () => {
  let component: RootLocaleDetailComponent;
  let fixture: ComponentFixture<RootLocaleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLocaleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLocaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
