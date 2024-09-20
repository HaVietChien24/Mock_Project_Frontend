import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { BorrowingService } from '../../../service/borrowing-service/borrowing.service';
import { MatTableModule } from '@angular/material/table';
import { CustomDatePipe } from '../../../pipes/customdate.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-book-borrow',
  standalone: true,
  imports: [AdminSideBarComponent, MatTableModule, CustomDatePipe, MatPaginator, MatSort, MatButtonModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-book-borrow.component.html',
  styleUrl: './admin-book-borrow.component.css'
})
export class AdminBookBorrowComponent implements OnInit {


  data: any;

  displayedColumns: string[] = ['Id', 'username', 'requestDate', 'expectedPickUpDate', 'expectedReturnDate'
    , 'TotalQuantity', 'BorrowingStatus', 'Penalty', 'IsBookPickedUp', 'IsPickUpLate', 'Action'];

  showPickUpButton!: boolean;
  searchKey: string = '';

  constructor(private service: BorrowingService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();

  }
  loadData(): void {
    this.service.GetAllBookBorrowAdmin(this.searchKey, 1, 5).subscribe((response) => {

      this.data = response.items;
      console.log('Data received:', this.data);
      this.data.forEach((item: any) => {
        if (item.isPickUpLate === "Over date") {
          this.showPickUpButton = false;
        } else {
          this.showPickUpButton = true;
        }

      })

      this.cdr.detectChanges();
    });
  }
  applyFilter(): void {
    this.loadData();
  }
  ConfirmPickUp(id: number): void {
    this.service.ConfirmPickedUp(id).subscribe(
      (response) => {
        console.log('Xác nhận thành công:', response);
        this.loadData();
      },
      (error) => {
        console.error('Xác nhận thất bại:', error);
      }
    );
  }
}

