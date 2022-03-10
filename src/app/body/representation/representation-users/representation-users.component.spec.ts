import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationUsersComponent } from './representation-users.component';

describe('RepresentationUsersComponent', () => {
  let component: RepresentationUsersComponent;
  let fixture: ComponentFixture<RepresentationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
