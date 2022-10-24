import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedDiscussionViewComponent } from './expanded-discussion-view.component';

describe('ExpandedDiscussionViewComponent', () => {
  let component: ExpandedDiscussionViewComponent;
  let fixture: ComponentFixture<ExpandedDiscussionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedDiscussionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandedDiscussionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
