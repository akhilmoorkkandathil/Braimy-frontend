import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiesComponent } from './emojies.component';

describe('EmojiesComponent', () => {
  let component: EmojiesComponent;
  let fixture: ComponentFixture<EmojiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
