import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    code: ['', [Validators.required]],
    description: ['', []],
    prix: [1, []],
    etat: [null, [Validators.required]],
    listeEtiquettes: [[], []],
  });

  listeEtat: any[] = [];
  listeEtiquettes: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/etat-produit/liste')
      .subscribe((resultat) => (this.listeEtat = resultat));

    this.http
      .get<any[]>('http://localhost:8080/etiquette-produit/liste')
      .subscribe((resultat) => (this.listeEtiquettes = resultat));
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:8080/produit', this.formulaire.value)
        .subscribe((resultat) => console.log(resultat));
    }
  }
}
