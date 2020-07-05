import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedoresPage } from './contenedores.page';

describe('ContenedoresPage', () => {
  let component: ContenedoresPage;
  let fixture: ComponentFixture<ContenedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
