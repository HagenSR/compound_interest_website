import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestLegComponent } from './compound-interest-leg.component';

describe('CompoundInterestLegComponent', () => {
  let component: CompoundInterestLegComponent;
  let fixture: ComponentFixture<CompoundInterestLegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundInterestLegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundInterestLegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
