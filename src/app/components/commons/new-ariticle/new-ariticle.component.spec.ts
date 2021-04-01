import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAriticleComponent } from './new-ariticle.component';

describe('NewAriticleComponent', () => {
  let component: NewAriticleComponent;
  let fixture: ComponentFixture<NewAriticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAriticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAriticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
