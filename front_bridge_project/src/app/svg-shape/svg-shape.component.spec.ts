import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgShapeComponent } from './svg-shape.component';

describe('SvgShapeComponent', () => {
  let component: SvgShapeComponent;
  let fixture: ComponentFixture<SvgShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
