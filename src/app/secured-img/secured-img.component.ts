import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'secured-img',
  standalone: true,
  imports: [],
  templateUrl: './secured-img.component.html',
  styleUrl: './secured-img.component.scss',
})
export class SecuredImgComponent {
  @Input()
  nomImage: string | null = null;

  image: string | ArrayBuffer | null = null;

  http: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.http
      .get('http://' + environment.urlServeur + '/download/' + this.nomImage, {
        responseType: 'blob',
      })
      .subscribe((image) => {
        let reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            this.image = reader.result;
          },
          false
        );

        if (image) {
          reader.readAsDataURL(image);
        }
      });
  }
}
