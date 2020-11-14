import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRepresentationComponent } from './detail-representation.component';

describe('DetailRepresentationComponent', () => {
  let component: DetailRepresentationComponent;
  let fixture: ComponentFixture<DetailRepresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRepresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
