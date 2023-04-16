import { Component, HostListener } from '@angular/core';
import { OLMUserModel } from '../../../shared/models/user.model';
import { OLMBookModel } from '../../../shared/models/book.model';
import { UserService } from '../../../shared/services/user/user.service';
import { BookService } from '../../../shared/services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public activeUser: OLMUserModel | null = null;
  public activeBook: OLMBookModel | null = null;

  private barcodeActive = '';
  private barcodeTimeout: any;

  constructor(private userService: UserService, private bookService: BookService) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(event);
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyB') {
      console.log(event);
    } else if (event.code === 'Enter') {
      this.barcodeActive = '';
    } else if (event.code === 'Delete' || event.code === 'Backspace') {
      this.barcodeActive = '';
    } else if (/^[^\s]$/.test(event.key)) {
      this.barcodeActive += event.key;
      clearTimeout(this.barcodeTimeout);
      this.barcodeTimeout = setTimeout(() => {
        this.onBarcodeActiveChange();
        this.processBarcode();
      }, 800);
    }

    console.log(this.barcodeActive);
  }

  processBarcode() {
    console.log('Barcode:', this.barcodeActive);

    setTimeout(async () => {
      try {
        if (this.barcodeActive[0] === 'U') {
          this.activeUser = await this.userService.getUserByBarcode(this.barcodeActive);
        } else if (this.barcodeActive[0] === 'B') {
          this.activeBook = await this.bookService.getBookByBarcode(this.barcodeActive);
        }
        this.barcodeActive = '';
      } catch (error) {
        if (this.barcodeActive[0] === 'U') {
          this.activeUser = null;
        } else if (this.barcodeActive[0] === 'B') {
          this.activeBook = null;
        }
        this.barcodeActive = '';
      }
    }, 0);
  }

  onBarcodeActiveChange() {
    this.barcodeActive = this.barcodeActive.trim();
  }
}
