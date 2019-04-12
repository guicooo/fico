import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAoVivoComponent } from './cadastro-ao-vivo.component';

describe('CadastroAoVivoComponent', () => {
  let component: CadastroAoVivoComponent;
  let fixture: ComponentFixture<CadastroAoVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAoVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAoVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
