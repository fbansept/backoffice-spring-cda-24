import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    motDePasse: ['', [Validators.required]],
  });

  afficheMotDePasse = false;
  afficheMotDePasseConfirme = false;
}
