import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permission',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './permission.html',
  styleUrl: './permission.css',
})

export class Permission implements  DoCheck {
  permissions: string[] = [];
  userId = '';
  teamId = '';
  loading = false;
  error = '';

  constructor(private api: Api) {}

  ngDoCheck() {
    const u = localStorage.getItem('userId');
    const t = localStorage.getItem('teamId');

    // 🔥 Only call API when values change
    if (u !== this.userId || t !== this.teamId) {
      this.userId = u || '';
      this.teamId = t || '';

      if (this.userId && this.teamId) {
        this.fetchPermissions();
      }
    }
  }

  fetchPermissions() {
    this.loading = true;
    this.error = '';

    this.api.getPermissions(this.userId, this.teamId).subscribe({
      next: (data) => {
        this.permissions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.permissions = [];
        this.loading = false;
      }
    });
  }
}