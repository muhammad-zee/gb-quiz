import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJoinComponent } from './public-join.component';

describe('PublicJoinComponent', () => {
  let component: PublicJoinComponent;
  let fixture: ComponentFixture<PublicJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
