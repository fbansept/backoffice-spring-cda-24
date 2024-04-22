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
import { ActivatedRoute, Router } from '@angular/router';

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
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

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

  idProduit: number | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((parametres) => {
      this.idProduit = parametres['id'];

      if (this.idProduit != null && !isNaN(this.idProduit)) {
        this.http
          .get('http://localhost:8080/produit/' + this.idProduit)
          .subscribe({
            next: (produit) => {
              console.log(produit);
              this.formulaire.patchValue(produit);
            },

            error: (error) => {
              if (error.status == 404) {
                alert("le produit n'existe plus");
              }
            },
          });
      }
    });

    this.http
      .get<any[]>('http://localhost:8080/etat-produit/liste')
      .subscribe((resultat) => (this.listeEtat = resultat));

    this.http
      .get<any[]>('http://localhost:8080/etiquette-produit/liste')
      .subscribe((resultat) => (this.listeEtiquettes = resultat));
  }

  onSubmit() {
    if (this.formulaire.valid) {
      if (this.idProduit) {
        this.http
          .put(
            'http://localhost:8080/produit/' + this.idProduit,
            this.formulaire.value
          )
          .subscribe((resultat) => this.router.navigateByUrl('/accueil'));
      } else {
        this.http
          .post('http://localhost:8080/produit', this.formulaire.value)
          .subscribe((resultat) => this.router.navigateByUrl('/accueil'));
      }

      //note : solution dans le cas ou l'on utilise la methode POST pour l'ajout et la modification dans le back
      // const produit = { ...this.formulaire.value, id: this.idProduit };
      // this.http
      //   .post('http://localhost:8080/produit', produit)
      //   .subscribe((resultat) => console.log(resultat));
    }
  }

  comparateurParId(a: any, b: any) {
    return a != null && b != null && a.id == b.id;
  }
}
