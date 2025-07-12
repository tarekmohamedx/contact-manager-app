import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../login/auth.service';


@Component({
  selector: 'app-contactlist',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css',
})
export class ContactlistComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router,
    private socketService: SocketService,
    private authService: AuthService
  ) {}
  contacts: Contact[] = [];
  page: number = 1;
  limit: number = 5;
  totalPages: number = 1;
  total: number = 0;
  searchTerm: string = '';

  ngOnInit() {

    this.loadContacts();
  }

  loadContacts () {
    this.contactService
    .getAllContacts(1, this.limit, this.searchTerm)
    .subscribe({
      next: (response: any) => {
        // console.log('Get contacts response:', response);
        this.assignDataToVariables(response);
        this.toastr.success('Contacts Loaded successfully', 'Success');
        
      },
      error: (error) => {
        const msg =
          error.error.message || 'An error occurred while fetching contacts';
        console.error('Get contacts failed', msg);
        this.notifyOnError(error);
      },
    });
  }

  getContacts(page: number) {
    this.contactService
      .getAllContacts(page, this.limit, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          // console.log('Get contacts response:', response);
          this.assignDataToVariables(response);          
        },
        error: (error) => {
          const msg =
            error.error.message || 'An error occurred while fetching contacts';
          console.error('Get contacts failed', msg);
          this.notifyOnError(error);
        },
      });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getContacts(page);
    }
  }


  deleteContact(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This contact will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContact(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
            this.getContacts(this.page);
          },
          error: (error) => {
            Swal.fire('Error', 'Something went wrong', 'error');
          }
        });
      }
    });
  }

  onSearch() {
    this.page = 1;
    this.getContacts(this.page);
  }
  notifyOnError(error: any) {
    this.toastr.error('An error occurred while fetching contacts', 'Error');
  }

  assignDataToVariables(response: any) {
    this.contacts = response.contacts;
    this.totalPages = response.paginationData.totalPages;
    this.page = response.paginationData.page
    this.total = response.paginationData.total

    // console.log('Contacts:', this.contacts);
    // console.log('Total Pages:', this.totalPages);
    // console.log('Current Page:', this.page);
    // console.log('Total Contacts:', this.total);
  }

  editContact(contact: Contact) {
    this.socketService.emit('lock-contact', {
      contactId: contact._id,
      userId: this.authService.getCurrentUser()?.id,
    });
  
    this.router.navigate(['/contact/edit', contact._id]);
  }


}
