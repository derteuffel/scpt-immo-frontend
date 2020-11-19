import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationLocaleAddComponent } from './root-representation-locale-add.component';

describe('RootRepresentationLocaleAddComponent', () => {
  let component: RootRepresentationLocaleAddComponent;
  let fixture: ComponentFixture<RootRepresentationLocaleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationLocaleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationLocaleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
