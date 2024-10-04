import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToUserCourseBucketComponent } from './add-to-user-course-bucket.component';

describe('AddToUserCourseBucketComponent', () => {
  let component: AddToUserCourseBucketComponent;
  let fixture: ComponentFixture<AddToUserCourseBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToUserCourseBucketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToUserCourseBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
