import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLocaleContratUpdateComponent } from './root-locale-contrat-update.component';

describe('RootLocaleContratUpdateComponent', () => {
  let component: RootLocaleContratUpdateComponent;
  let fixture: ComponentFixture<RootLocaleContratUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLocaleContratUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLocaleContratUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
