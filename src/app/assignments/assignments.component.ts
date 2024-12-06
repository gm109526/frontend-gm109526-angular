import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


import { Assignment } from './assignment.model';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';

import { Router, RouterOutlet, RouterLink } from '@angular/router';

import { generatedAssignments } from '../shared/data';
  
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatButtonModule,
    MatListModule, MatDividerModule,
    AssignmentDetailComponent, AddAssignmentComponent,
    RouterLink, RouterOutlet
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  //pour gérer la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  titre = "Liste des assignments";
  boutonDesactive = false;

  createdMessage = "";

  // Assignment sur lequel on a cliqué
  assignmentSelectionne: Assignment | null = null;

  // Pour afficher ou non le formulaire ou la liste
  formVisible = false;

  assignments!: Assignment[];

  constructor(private assignmentsService: AssignmentsService, router: Router) {
    console.log("constructeur appelé")
  }

  ngOnInit(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log("Données reçues");
      }
    );
  }

  getAssignments() {
    console.log("get assignments appelé")
    this.assignmentsService.getAssignments().subscribe((assignments: Assignment[]) => {
      this.assignments = assignments;
    });
  }

  peuplerBD() { 
    const requests = generatedAssignments.map(assignment => 
      this.assignmentsService.addAssignment(assignment)
    );
  
    // Utiliser forkJoin pour attendre que toutes les requêtes soient terminées
    forkJoin(requests).subscribe(
      results => {
        console.log("Toutes les requêtes ont été complétées :", results);
        this.createdMessage = "La DB a été remplie.";
      },
      error => {
        console.error("Une erreur s'est produite lors du remplissage de la DB :", error);
      }
    );
  }
  
  goToFirstPage() {
    if (this.hasPrevPage) {
      this.page = 1;
      this.fetchAssignments();
    }
  }
  
  goToPreviousPage() {
    if (this.hasPrevPage) {
      this.page--;
      this.fetchAssignments();
    }
  }
  
  goToNextPage() {
    if (this.hasNextPage) {
      this.page++;
      this.fetchAssignments();
    }
  }
  
  goToLastPage() {
    if (this.hasNextPage) {
      this.page = this.totalPages;
      this.fetchAssignments();
    }
  }
  
  fetchAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
      },
      error => console.error("Erreur lors de la récupération des assignments :", error)
    );
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  testeClick(a: any) {
    console.log("click  sur : " + a.nom);
  }



  assignmentClique(a: Assignment) {
    console.log("Assignment cliqué : " + a.nom);
    this.assignmentSelectionne = a;
  }

  onAddAssignmentBtnClick() {
    console.log("Bouton Add Assignment cliqué");
    this.formVisible = true;
  }

  addAssignment(newAssignment: Assignment) {
    console.log("Nouvel assignment reçu : " + 
      newAssignment.nom);
    this.assignments.push(newAssignment);
    // et on cache le formulaire
    // et on affiche la liste
    this.formVisible = false;
  }

  onDeleteAssignment() {
    if (this.assignmentSelectionne) {
      console.log("Suppression de l'assignment :", this.assignmentSelectionne.nom);
      this.assignments = this.assignments.filter(a => a !== this.assignmentSelectionne);
      this.assignmentSelectionne = null; // Réinitialise après suppression
    }
  }
  // onNouvelAssignement(event:Assignment) {
  //   this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));
  //   this.formVisible = false; 
  // }
  
}
