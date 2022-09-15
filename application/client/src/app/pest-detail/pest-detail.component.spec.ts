import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestDetailComponent } from './pest-detail.component';

describe('PestDetailComponent', () => {
  let component: PestDetailComponent;
  let fixture: ComponentFixture<PestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
