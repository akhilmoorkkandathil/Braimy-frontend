import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughbutGraphComponent } from './doughbut-graph.component';

describe('DoughbutGraphComponent', () => {
  let component: DoughbutGraphComponent;
  let fixture: ComponentFixture<DoughbutGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughbutGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughbutGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
