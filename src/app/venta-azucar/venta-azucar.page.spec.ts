import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAzucarPage } from './venta-azucar.page';

describe('VentaAzucarPage', () => {
  let component: VentaAzucarPage;
  let fixture: ComponentFixture<VentaAzucarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaAzucarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaAzucarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
