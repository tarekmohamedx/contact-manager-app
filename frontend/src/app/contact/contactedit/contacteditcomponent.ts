import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-contactadd',
  imports: [FormsModule, CommonModule],
  templateUrl: './contactedit.component.html',
})
export class ContacteditComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private socketService: SocketService,
    private authService: AuthService,
    private toaster: ToastrService

  ) {}
  ngOnDestroy(): void {
    this.unlockContact();
  }
  contact: Contact = {
    Name: '',
    Address: '',
    Phone: '',
    notes: '',
  };
  contactId: string = '';
  isLocked: boolean = false;
  lockedByOtherUser: boolean = false;
  currentUserId: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.contactId = params.get('id') || '';
      if (this.contactId) {
        this.loadContact();
      }
    });
    this.currentUserId = this.authService.getCurrentUser()?.id || ''; 
    this.LockEditing();

  }

  onSubmit(ngForm: NgForm, event: Event): void {
    if (ngForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form submitted successfully: ', this.contact);
    this.updateContact();
  }

  updateContact(): void {
    this.contactService.updateContact(this.contact).subscribe({
      next: (response: any) => {
        console.log('Contact added successfully', response);
        this.toastr.success('Contact added successfully', 'Success');
        this.unlockContact();
        this.redirectToContact();
      },
      error: (error) => {
        const msg =
          error.error.message || 'An error occurred while adding contact';
        console.log('Add contact failed', msg);
        this.toastr.error('Unauthorized, Log in Again', 'Add Contact Failed');
        setTimeout(() => {
          this.redirectToLogin();
        }, 3000);
      },
    });
  }

  redirectToLogin(): void {
    this.toastr.info('Redirect to Login in 4 seconds', 'Redirecting');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
  }
  redirectToContact(): void {
    this.toastr.info('Redirect to Contacts in 3 seconds', 'Redirecting');
    setTimeout(() => {
      this.router.navigate(['/contact']);
    }, 3000);
  }

  loadContact() {
    this.contactService.getContactById(this.contactId).subscribe({
      next: (contact) => {
        this.contact = contact;
      },
      error: (err) => {
        console.error('Failed to load contact', err);
      },
    });
  }

  //socket
  LockEditing(){
    this.socketService.listen<{ contactId: string, userId: string }>('edit-locked')
    .subscribe((data) => {
      if (data.contactId === this.contactId && data.userId !==  this.currentUserId) {
        console.log('Contact is locked for editing by another user:', data.userId);
        this.isLocked = true;
      }
    });

  this.socketService.listen<{ contactId: string }>('edit-unlocked')
    .subscribe((data) => {
      if (data.contactId === this.contactId) {
        this.isLocked = false;
      }
    });

    this.socketService.listen<{ contactId: string; lockedBy: string; message: string }>('lock-failed')
  .subscribe((data) => {
    if (data.contactId === this.contactId) {
      this.isLocked = true;
      this.lockedByOtherUser = true;
      this.toaster.warning(data.message, 'Contact Locked')
    }
  });
  }

  
  unlockContact() {
    this.socketService.emit('unlock-contact', {
      contactId: this.contactId
    });
  }
  
}
