import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTagComponent } from './button-tag.component';

describe('ButtonTagComponent', () => {
  let component: ButtonTagComponent;
  let fixture: ComponentFixture<ButtonTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
