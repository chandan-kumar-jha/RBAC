import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api'; 
import { OnInit } from '@angular/core';


interface Team {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-team-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-select.html',
  styleUrl: './team-select.css',
})
export class TeamSelect implements OnInit {
  teams: any[] = [];
  selectedTeamId = '';
  loading = false;
  error = '';

  constructor(private api: Api) {}

  ngOnInit() {
    this.loading = true;

    this.api.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  selectTeam(team: any) {
  console.log("CLICK TEAM:", team); 

  this.selectedTeamId = team._id;
  localStorage.setItem("teamId", team._id);
}
}