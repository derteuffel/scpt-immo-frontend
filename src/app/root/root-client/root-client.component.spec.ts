import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootClientComponent } from './root-client.component';

describe('RootClientComponent', () => {
  let component: RootClientComponent;
  let fixture: ComponentFixture<RootClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
