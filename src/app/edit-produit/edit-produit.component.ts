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
import { environment } from '../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  fichierSelectionne: File | null = null;

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
          .get(
            'http://' + environment.urlServeur + '/produit/' + this.idProduit
          )
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
      .get<any[]>('http://' + environment.urlServeur + '/etat-produit/liste')
      .subscribe((resultat) => (this.listeEtat = resultat));

    this.http
      .get<any[]>(
        'http://' + environment.urlServeur + '/etiquette-produit/liste'
      )
      .subscribe((resultat) => (this.listeEtiquettes = resultat));
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const donnees = new FormData();

      donnees.append(
        'produit',
        new Blob([JSON.stringify(this.formulaire.value)], {
          type: 'application/json',
        })
      );

      if (this.fichierSelectionne) {
        donnees.append('image', this.fichierSelectionne);
      }

      if (this.idProduit) {
        this.http
          .put(
            'http://' + environment.urlServeur + '/produit/' + this.idProduit,
            donnees
          )
          .subscribe((resultat) => this.router.navigateByUrl('/accueil'));
      } else {
        this.http
          .post('http://' + environment.urlServeur + '/produit', donnees)
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

  onSelectionFichier(evenement: any) {
    this.fichierSelectionne = evenement.target.files[0];
  }
}
