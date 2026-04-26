import { Component } from '@angular/core';
import { UserSelect } from './pages/user-select/user-select';
import { TeamSelect } from './pages/team-select/team-select';
import { Permission } from './pages/permission/permission';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserSelect,
    TeamSelect,
    Permission
  ],
  templateUrl: './app.html'
})
export class App {}