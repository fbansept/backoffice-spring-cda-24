import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['a@a.com', [Validators.email, Validators.required]],
    motDePasse: ['root', [Validators.required]],
  });

  erreurConnexion: boolean = false;

  onConnexion() {
    if (this.formulaire.valid) {
      this.http
        .post<{ jwt: string }>(
          'http://localhost:8080/connexion',
          this.formulaire.value
        )
        .subscribe({
          next: (resultat) => {
            localStorage.setItem('jwt', resultat.jwt);
            this.router.navigateByUrl('/accueil');
          },
          error: (reponse) => {
            //alert('Les identifiants sont incorrets');
            this.erreurConnexion = true;
          },
        });
    }
  }
}
