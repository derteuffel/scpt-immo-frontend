import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleUpdateComponent } from './root-representation-locale-update.component';

describe('RootRepresentationLocaleUpdateComponent', () => {
  let component: RootRepresentationLocaleUpdateComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
