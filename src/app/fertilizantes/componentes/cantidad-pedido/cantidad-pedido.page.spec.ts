import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadPedidoPage } from './cantidad-pedido.page';

describe('CantidadPedidoPage', () => {
  let component: CantidadPedidoPage;
  let fixture: ComponentFixture<CantidadPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantidadPedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidadPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
