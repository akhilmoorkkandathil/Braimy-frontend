import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesBucketComponent } from './user-courses-bucket.component';

describe('UserCoursesBucketComponent', () => {
  let component: UserCoursesBucketComponent;
  let fixture: ComponentFixture<UserCoursesBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoursesBucketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCoursesBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
