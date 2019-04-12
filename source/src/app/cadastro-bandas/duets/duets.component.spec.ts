import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuetsComponent } from './duets.component';

describe('DuetsComponent', () => {
  let component: DuetsComponent;
  let fixture: ComponentFixture<DuetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
