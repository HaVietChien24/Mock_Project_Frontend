import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookBorrowingDetailComponent } from './admin-book-borrowing-detail.component';

describe('AdminBookBorrowingDetailComponent', () => {
  let component: AdminBookBorrowingDetailComponent;
  let fixture: ComponentFixture<AdminBookBorrowingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookBorrowingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookBorrowingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
