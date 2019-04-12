import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicoesComponent } from './edicoes.component';

describe('EdicoesComponent', () => {
  let component: EdicoesComponent;
  let fixture: ComponentFixture<EdicoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
