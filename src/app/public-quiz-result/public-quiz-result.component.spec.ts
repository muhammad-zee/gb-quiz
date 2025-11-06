import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuizResultComponent } from './public-quiz-result.component';

describe('PublicQuizResultComponent', () => {
  let component: PublicQuizResultComponent;
  let fixture: ComponentFixture<PublicQuizResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicQuizResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicQuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
