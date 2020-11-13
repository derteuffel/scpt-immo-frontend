import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationComponent } from './root-representation.component';

describe('RootRepresentationComponent', () => {
  let component: RootRepresentationComponent;
  let fixture: ComponentFixture<RootRepresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
