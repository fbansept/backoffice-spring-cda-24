import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent implements OnInit {
  http: HttpClient = inject(HttpClient);

  listeProduit: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/produit/liste')
      .subscribe((listeProduit) => (this.listeProduit = listeProduit));
  }

  onSupprimerProduit(idProduit: number): void {
    this.http
      .delete('http://localhost:8080/produit/' + idProduit)
      .subscribe((resultat) => console.log(resultat));
  }
}
