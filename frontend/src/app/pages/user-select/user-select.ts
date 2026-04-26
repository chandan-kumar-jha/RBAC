import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api'; 

interface User {
  _id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-select',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-select.html',
  styleUrl: './user-select.css',
})
export class UserSelect {

users: any[] = [];
filtered: any[] = [];
search = '';
selectedUserId = '';
loading = false;
error = '';

constructor(private api: Api) {}

ngOnInit() {
  this.loading = true;

  this.api.getUsers().subscribe({
    next: (data) => {
      this.users = data;
      this.filtered = data;
      this.loading = false;
    },
    error: (err) => {
      this.error = err.message;
      this.loading = false;
    }
  });
}

  // 🔍 Filter logic
  filter() {
    const value = this.search.toLowerCase();

    this.filtered = this.users.filter(u =>
      u.name.toLowerCase().includes(value) ||
      u.email.toLowerCase().includes(value)
    );
  }

  selectUser(user: any) {
  console.log("CLICK USER:", user);

  this.selectedUserId = user._id;
  localStorage.setItem("userId", user._id);
}
}
