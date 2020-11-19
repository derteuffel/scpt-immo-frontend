import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLocaleUpdateComponent } from './root-locale-update.component';

describe('RootLocaleUpdateComponent', () => {
  let component: RootLocaleUpdateComponent;
  let fixture: ComponentFixture<RootLocaleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLocaleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLocaleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
