import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaqDialogComponent } from './add-faq-dialog.component';

describe('AddFaqDialogComponent', () => {
  let component: AddFaqDialogComponent;
  let fixture: ComponentFixture<AddFaqDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaqDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
