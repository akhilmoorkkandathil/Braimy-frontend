import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorClassesComponent } from './coordinator-classes.component';

describe('CoordinatorClassesComponent', () => {
  let component: CoordinatorClassesComponent;
  let fixture: ComponentFixture<CoordinatorClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatorClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
