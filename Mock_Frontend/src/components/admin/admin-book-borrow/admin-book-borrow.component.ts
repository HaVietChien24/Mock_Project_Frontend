import { Component, type OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { BorrowingService } from '../../../service/borrowing-service/borrowing.service';
import { MatTableModule } from '@angular/material/table';
import { CustomDatePipe } from '../../../pipes/customdate.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-book-borrow',
  standalone: true,
  imports: [AdminSideBarComponent, MatTableModule, CustomDatePipe, MatPaginator, MatSort, MatButtonModule, RouterLink],
  templateUrl: './admin-book-borrow.component.html',
  styleUrl: './admin-book-borrow.component.css'
})
export class AdminBookBorrowComponent implements OnInit {
  data: any;
  displayedColumns: string[] = ['Id', 'username', 'requestDate', 'expectedPickUpDate', 'expectedReturnDate'
    , 'TotalQuantity', 'BorrowingStatus', 'Penalty', 'Action'];

  constructor(private service: BorrowingService) {

  }
  ngOnInit(): void {
    this.service.GetAllBookBorrowAdmin().subscribe((response) => {
      this.data = response.items;
      console.log('Data received:', this.data);
    }
    )
  }

}
