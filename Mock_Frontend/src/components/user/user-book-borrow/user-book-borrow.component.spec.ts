import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookBorrowComponent } from './user-book-borrow.component';

describe('UserBookBorrowComponent', () => {
  let component: UserBookBorrowComponent;
  let fixture: ComponentFixture<UserBookBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookBorrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
