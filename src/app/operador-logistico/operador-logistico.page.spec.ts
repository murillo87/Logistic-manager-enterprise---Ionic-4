import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorLogisticoPage } from './operador-logistico.page';

describe('OperadorLogisticoPage', () => {
  let component: OperadorLogisticoPage;
  let fixture: ComponentFixture<OperadorLogisticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorLogisticoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorLogisticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
