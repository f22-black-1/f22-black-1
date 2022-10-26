import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestReportComponent } from './pest-report.component';

describe('PestReportComponent', () => {
  let component: PestReportComponent;
  let fixture: ComponentFixture<PestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
