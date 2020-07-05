import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBlPage } from './detalle-bl.page';

describe('DetalleBlPage', () => {
  let component: DetalleBlPage;
  let fixture: ComponentFixture<DetalleBlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
