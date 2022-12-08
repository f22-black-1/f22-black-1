import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfocardComponent } from './userinfocard.component';

describe('UserinfocardComponent', () => {
  let component: UserinfocardComponent;
  let fixture: ComponentFixture<UserinfocardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfocardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserinfocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
