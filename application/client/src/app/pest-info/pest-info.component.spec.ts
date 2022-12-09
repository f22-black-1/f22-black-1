import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestInfoComponent } from './pest-info.component';

describe('PestInfoComponent', () => {
  let component: PestInfoComponent;
  let fixture: ComponentFixture<PestInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
