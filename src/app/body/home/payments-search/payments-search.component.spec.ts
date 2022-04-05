import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSearchComponent } from './payments-search.component';

describe('PaymentsSearchComponent', () => {
  let component: PaymentsSearchComponent;
  let fixture: ComponentFixture<PaymentsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
