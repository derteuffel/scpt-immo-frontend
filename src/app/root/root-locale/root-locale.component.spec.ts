import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLocaleComponent } from './root-locale.component';

describe('RootLocaleComponent', () => {
  let component: RootLocaleComponent;
  let fixture: ComponentFixture<RootLocaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLocaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
