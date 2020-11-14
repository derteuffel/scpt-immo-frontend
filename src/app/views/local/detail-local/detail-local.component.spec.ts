import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLocalComponent } from './detail-local.component';

describe('DetailLocalComponent', () => {
  let component: DetailLocalComponent;
  let fixture: ComponentFixture<DetailLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
