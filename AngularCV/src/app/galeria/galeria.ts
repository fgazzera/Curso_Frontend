import { Component, inject } from '@angular/core';
import { ArtService } from '../services/art.service';
import { ArtItem } from "./art-item/art-item";

@Component({
  selector: 'app-galeria',
  imports: [ArtItem],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss'
})
export class Galeria {
  artService = inject(ArtService);
}
