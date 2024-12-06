import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomDevoir = '';
  dateDeRendu?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //this.getAssignment();

    //affichage des queryParams et fragment
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment :");
    console.log(this.route.snapshot.fragment);
  }
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomDevoir == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomDevoir;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .editAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
 
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
 }
 