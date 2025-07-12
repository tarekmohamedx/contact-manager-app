import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactadd',
  imports: [FormsModule, CommonModule],
  templateUrl: './contactadd.component.html',
  styleUrl: './contactadd.component.css',
})
export class ContactaddComponent {
  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private router : Router
  ) {}
  contact: Contact = {
    Name: '',
    Address: '',
    Phone: '',
    notes: '',
  };

  onSubmit(ngForm: NgForm, event: Event): void {
    if (ngForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form submitted successfully: ', this.contact);
    this.addContact();
  }

  addContact(): void {
    this.contactService.addContact(this.contact).subscribe({
      next: (response: any) => {
        console.log('Contact added successfully', response);
        this.toastr.success('Contact added successfully', 'Success');
        this.redirectToContact();
      },
      error: (error) => {
        const msg =
          error.error.message || 'An error occurred while adding contact';
        console.log('Add contact failed', msg);
        this.toastr.error("Unauthorized, Log in Again", 'Add Contact Failed');
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
}
