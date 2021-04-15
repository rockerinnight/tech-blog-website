import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteArticlesComponent } from './favorite-articles.component';

describe('FavoriteArticlesComponent', () => {
  let component: FavoriteArticlesComponent;
  let fixture: ComponentFixture<FavoriteArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
