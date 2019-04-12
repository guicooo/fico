import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompIneditaComponent } from './comp-inedita.component';

describe('CompIneditaComponent', () => {
  let component: CompIneditaComponent;
  let fixture: ComponentFixture<CompIneditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompIneditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompIneditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
