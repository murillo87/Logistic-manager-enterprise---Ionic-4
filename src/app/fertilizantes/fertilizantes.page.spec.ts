import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizantesPage } from './fertilizantes.page';

describe('FertilizantesPage', () => {
  let component: FertilizantesPage;
  let fixture: ComponentFixture<FertilizantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FertilizantesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
