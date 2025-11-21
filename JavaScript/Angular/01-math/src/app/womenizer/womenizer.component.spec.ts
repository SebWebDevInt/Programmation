import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenizerComponent } from './womenizer.component';

describe('WomenizerComponent', () => {
  let component: WomenizerComponent;
  let fixture: ComponentFixture<WomenizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
