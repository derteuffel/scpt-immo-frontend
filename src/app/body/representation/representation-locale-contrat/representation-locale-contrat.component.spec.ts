import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationLocaleContratComponent } from './representation-locale-contrat.component';

describe('RepresentationLocaleContratComponent', () => {
  let component: RepresentationLocaleContratComponent;
  let fixture: ComponentFixture<RepresentationLocaleContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentationLocaleContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentationLocaleContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
