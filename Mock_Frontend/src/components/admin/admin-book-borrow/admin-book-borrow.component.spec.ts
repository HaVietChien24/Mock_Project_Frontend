import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookBorrowComponent } from './admin-book-borrow.component';

describe('AdminBookBorrowComponent', () => {
  let component: AdminBookBorrowComponent;
  let fixture: ComponentFixture<AdminBookBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookBorrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
