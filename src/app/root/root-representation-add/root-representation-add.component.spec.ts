import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRepresentationAddComponent } from './root-representation-add.component';

describe('RootRepresentationAddComponent', () => {
  let component: RootRepresentationAddComponent;
  let fixture: ComponentFixture<RootRepresentationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRepresentationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRepresentationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
