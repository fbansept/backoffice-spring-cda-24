import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LabelComponent } from '../label/label.component';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { environment } from '../../environments/environment';
import { SecuredImgComponent } from '../secured-img/secured-img.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    LabelComponent,
    RouterLink,
    SecuredImgComponent,
  ],
})
export class AccueilComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);

  listeProduit: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://' + environment.urlServeur + '/produit/liste')
      .subscribe((listeProduit) => (this.listeProduit = listeProduit));
  }

  onSupprimerProduit(idProduit: number): void {
    this.http
      .delete('http://' + environment.urlServeur + '/produit/' + idProduit)
      .subscribe((resultat) => console.log(resultat));
  }
}
