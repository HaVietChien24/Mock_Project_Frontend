import { Component, OnInit } from '@angular/core';
import { AdminSideBarComponent } from "../admin-side-bar/admin-side-bar.component";
import { CommonModule } from '@angular/common';
import { BookService } from '../../../service/book-service/book.service';
import { GenreService } from '../../../service/genre-service/genre.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { FirebaseModule } from '../../../app/firebase/firebase.module';
@Component({
  selector: 'app-admin-manage-books',
  standalone: true,
  imports: [AdminSideBarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FirebaseModule

  ],
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.css']
})
export class AdminManageBooksComponent implements OnInit {

  isAddButtonDisabled = true; // Trạng thái nút "Add Book"
  isUpdateButtonDisabled = true; // Trạng thái nút "update Book"
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
    private genreService: GenreService,
    private fireStorage: AngularFireStorage
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
  // Hàm kiểm tra tính hợp lệ của form
  checkFormValidity(): void {
    this.isAddButtonDisabled = !(

      this.book.imageUrl
    );
  }

  checkFormUpdateValidity(): void {
    this.isUpdateButtonDisabled = !(

      this.bookupdate.imageUrl
    );
  }


  // Đổi trạng thái dropdown (mở/đóng)
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Hàm xử lý việc thêm sách
  addBook(): void {
    if (this.book.title == "" || this.book.description == "" || this.book.author == "" || this.book.publisher == ""
      || this.book.isbn == "" || this.book.genre == ""
    ) {
      alert('Please input all fields');
      return;
    }
    if (this.book.amount < 0 || this.book.publishedYear < 0) {
      alert('Please input amount or publishedYear > 0 ');
      return;
    }
    // Đảm bảo rằng genres là một mảng các chuỗi
    this.book.genres = this.selectedGenres;
    delete this.book.genreNames;
    // Kiểm tra kỹ các kiểu dữ liệu để tránh lỗi định dạng
    this.book.publishedYear = Number(this.book.publishedYear);
    this.book.amount = Number(this.book.amount);


    console.log('this.book', this.book);
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
    // Kiểm tra nếu người dùng đã chọn ảnh mới, cập nhật imageUrl tương ứng
    if (!this.bookupdate.imageUrl) {
      alert('Please upload a book image before updating.');
      return;
    }
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
  // Hàm để quản lý việc chọn hoặc bỏ chọn một genre
  onGenreChange(genre: any, event: any): void {
    if (this.isEditing) {
      if (event.target.checked) {
        this.selectedGenres.push(genre); // Thêm genre nếu được chọn
      } else {
        this.selectedGenres = this.selectedGenres.filter(g => g !== genre); // Bỏ genre nếu bỏ chọn
      }
    } else {
      if (event.target.checked) {
        this.selectedGenres.push(genre.name); // Thêm genre nếu được chọn
      } else {
        this.selectedGenres = this.selectedGenres.filter(g => g !== genre.name); // Bỏ genre nếu bỏ chọn
      }
    }

  }


  async onImageChange(event: any) {
    const file = event.target.files[0];  // Lấy file từ input

    if (file) {
      const path = `yt/${file.name}`;  // Tạo đường dẫn lưu trữ
      try {
        // Tải lên file
        const uploadTask = await this.fireStorage.upload(path, file);

        // Lấy URL của file sau khi tải lên thành công
        const url = await uploadTask.ref.getDownloadURL();
        // Kiểm tra nếu đang trong chế độ chỉnh sửa (updating)
        if (this.isEditing) {
          this.bookupdate.imageUrl = url; // Lưu URL vào đối tượng đang được chỉnh sửa
          this.checkFormUpdateValidity(); // Kiểm tra tính hợp lệ cho update
        } else {
          this.book.imageUrl = url; // Nếu không phải chế độ chỉnh sửa thì lưu vào đối tượng thêm mới
          this.checkFormValidity(); // Kiểm tra tính hợp lệ cho add
        }
        console.log('Download URL:', url);

        // Sau khi upload thành công, có thể xử lý tiếp, ví dụ lưu URL vào database

      } catch (error) {
        // Bắt lỗi khi upload thất bại
        console.error('Error uploading image:', error);

      }
    } else {
      console.log('No file selected');

    }

  }


}
