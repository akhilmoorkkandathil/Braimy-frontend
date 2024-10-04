import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBucketComponent } from './add-to-bucket.component';

describe('AddToBucketComponent', () => {
  let component: AddToBucketComponent;
  let fixture: ComponentFixture<AddToBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToBucketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
