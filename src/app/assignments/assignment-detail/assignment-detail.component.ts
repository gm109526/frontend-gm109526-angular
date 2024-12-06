import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';

import { AssignmentsService } from '../../shared/assignments.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,
    MatCheckboxModule, RouterLink
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
/*@Input()*/ assignmentTransmis!: Assignment;
@Output() deleteAssignment = new EventEmitter<Assignment>();

constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

ngOnInit() {
  this.getAssignment();
  console.log("FILS : ngOnInit appelé, après affichage");
}

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  // Fonction appelée lors du clic sur DELETE
  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    });
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    });
  }

  onClickEdit() {
    this.router.navigate(["/assignment-details", this.assignmentTransmis.id, 'edit'],
      {queryParams:{nom:this.assignmentTransmis.nom}, fragment:'edition'}
    );
  }

  isAdmin():boolean {
    return this.authService.admin;
  }
}
