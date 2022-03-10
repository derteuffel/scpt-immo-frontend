import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleContratMensualitesComponent } from './locale-contrat-mensualites.component';

describe('LocaleContratMensualitesComponent', () => {
  let component: LocaleContratMensualitesComponent;
  let fixture: ComponentFixture<LocaleContratMensualitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleContratMensualitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleContratMensualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
