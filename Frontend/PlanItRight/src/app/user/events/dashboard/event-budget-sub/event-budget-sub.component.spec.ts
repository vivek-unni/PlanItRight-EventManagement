import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBudgetSubComponent } from './event-budget-sub.component';

describe('EventBudgetSubComponent', () => {
  let component: EventBudgetSubComponent;
  let fixture: ComponentFixture<EventBudgetSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventBudgetSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventBudgetSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
