import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api/contact';

  addContact(contact: Contact) {
    return this.http.post(this.baseUrl, contact, this.getAuthHeaders());
  }

  getAllContacts(page: number, limit: number, searchTerm: string) {
    return this.http.get(
      `${this.baseUrl}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      this.getAuthHeaders()
    );
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  updateContact(contact: Contact) {
    return this.http.put(`${this.baseUrl}/${contact._id}`, contact, this.getAuthHeaders());
  }

  getContactById(id: string) {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }
  
  getAuthHeaders(): { headers: HttpHeaders } {
    const token = sessionStorage.getItem('token');
    console.log('Token from sessionStorage:', token);

    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }
}
