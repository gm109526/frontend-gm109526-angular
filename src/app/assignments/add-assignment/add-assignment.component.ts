import { Component, /*EventEmitter, Output*/ } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignment.model';

import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule,
    FormsModule, MatDatepickerModule, MatButtonModule, CommonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  providers: [provideNativeDateAdapter()],
})
export class AddAssignmentComponent {
  nomDevoir = '';
  dateDeRendu = null;

  constructor (private assignmentsService: AssignmentsService) {}

  onSubmit(event: any) {
    event.preventDefault();
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message));
  }
}
