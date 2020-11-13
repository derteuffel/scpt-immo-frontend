import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationUpdateComponent } from './root-representation-update.component';

describe('RootRepresentationUpdateComponent', () => {
  let component: RootRepresentationUpdateComponent;
  let fixture: ComponentFixture<RootRepresentationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
