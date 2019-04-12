import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AovivoComponent } from './aovivo.component';

describe('AovivoComponent', () => {
  let component: AovivoComponent;
  let fixture: ComponentFixture<AovivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AovivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AovivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
