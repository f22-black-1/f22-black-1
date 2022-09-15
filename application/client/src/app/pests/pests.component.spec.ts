import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestsComponent } from './pests.component';

describe('PestsComponent', () => {
  let component: PestsComponent;
  let fixture: ComponentFixture<PestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
