import { Component, OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { CommonModule } from '@angular/common';
import { BookService } from '../../../service/book-service/book.service';
import { GenreService } from '../../../service/genre-service/genre.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import $ from 'jquery'; // Sử dụng nhập khẩu mặc định cho jQuery

declare var bootstrap: any;  // Khai báo biến bootstrap
@Component({
  selector: 'app-admin-manage-books',
  standalone: true,
  imports: [AdminSideBarComponent, CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.css']
})
export class AdminManageBooksComponent implements OnInit {

  isEditing: boolean = false; // Khai báo biến isEditing
  bookIdToEdit: number | null = null; // Khai báo biến bookIdToEdit
  // Mảng để chứa các genres được chọn
  selectedGenres: string[] = [];
  // Mảng để chứa danh sách genres từ API
  genresList: any[] = [];
  isDropdownOpen: boolean = false;  // Kiểm soát trạng thái dropdown

  // Đối tượng sách
  book: any = {
    title: '',              // Chuỗi
    description: '',        // Chuỗi
    author: '',             // Chuỗi
    publisher: '',          // Chuỗi
    publishedYear: 0,       // Số nguyên
    isbn: '',               // Chuỗi
    amount: 0,              // Số nguyên
    imageUrl: '',           // Chuỗi
    genres: [] as string[]  // Mảng chuỗi
  };

  // Đối tượng sách
  bookupdate: any = {
    title: '',              // Chuỗi
    description: '',        // Chuỗi
    author: '',             // Chuỗi
    publisher: '',          // Chuỗi
    publishedYear: 0,       // Số nguyên
    isbn: '',               // Chuỗi
    amount: 0,              // Số nguyên
    imageUrl: '',           // Chuỗi
    genres: [] as string[]  // Mảng chuỗi
  };

  // Danh sách sách
  listBook: any[] = [];

  constructor(
    private bookService: BookService,
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    // Lấy danh sách sách từ API
    this.bookService.getAll().subscribe((response) => {
      this.listBook = response;
    });

    // Lấy danh sách thể loại từ API
    this.genreService.getAll().subscribe((response) => {
      this.genresList = response;
    });
  }

  // Hàm để quản lý việc chọn hoặc bỏ chọn một genre
  onGenreChange(genre: any, event: any): void {
    if (event.target.checked) {
      this.selectedGenres.push(genre.name); // Thêm genre nếu được chọn
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre.name); // Bỏ genre nếu bỏ chọn
    }
  }
  // Đổi trạng thái dropdown (mở/đóng)
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Hàm xử lý việc thêm sách
  addBook(): void {
    // Đảm bảo rằng genres là một mảng các chuỗi
    this.book.genres = this.selectedGenres;

    // Kiểm tra kỹ các kiểu dữ liệu để tránh lỗi định dạng
    this.book.publishedYear = Number(this.book.publishedYear);
    this.book.amount = Number(this.book.amount);

    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        // Xử lý phản hồi không phải JSON
        if (typeof response === 'string') {
          console.log('API response (string):', response);
          alert('Book added successfully!');
        } else {
          console.log('API response (object):', response);
          alert('Book added successfully!');
        }
        // Tải lại trang sau khi thêm sách thành công
        window.location.reload();
      },
      error: (error) => {
        // Ghi log lỗi chi tiết để kiểm tra
        console.error('Error details:', error);
        alert('Failed to add book!');
      }
    });
  }

  editBook(bookupdate: any): void {
    this.isEditing = true;
    this.bookupdate = { ...bookupdate }; // Lưu thông tin sách vào biến book
    this.selectedGenres = bookupdate.genreNames; // Cập nhật danh sách các genre đã chọn
  }


  updateBook(): void {


    this.bookupdate.genres = this.selectedGenres;
    delete this.bookupdate.genreNames;

    console.log("Before sending to API:", this.bookupdate);

    this.bookService.updateBook(this.bookupdate).subscribe({
      next: (response) => {
        alert('Book updated successfully!');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating book:', error);
        alert('Failed to update book!');
      }
    });
  }




}
