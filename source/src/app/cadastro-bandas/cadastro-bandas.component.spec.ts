import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBandasComponent } from './cadastro-bandas.component';

describe('CadastroBandasComponent', () => {
  let component: CadastroBandasComponent;
  let fixture: ComponentFixture<CadastroBandasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBandasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
