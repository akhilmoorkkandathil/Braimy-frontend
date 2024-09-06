import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetErrorComponent } from './internet-error.component';

describe('InternetErrorComponent', () => {
  let component: InternetErrorComponent;
  let fixture: ComponentFixture<InternetErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
