import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrometricGraphComponent } from './hydrometric-graph.component';

describe('HydrometricGraphComponent', () => {
  let component: HydrometricGraphComponent;
  let fixture: ComponentFixture<HydrometricGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HydrometricGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrometricGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
