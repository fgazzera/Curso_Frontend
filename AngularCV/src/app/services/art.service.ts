import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Artwork, ArtworksResponse } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.artic.edu/api/v1/artworks';

  readonly page = signal(1);
  readonly maxPages = signal(1);
  readonly artworks = signal<Artwork[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    effect(() => {
    this.loadArtworks(this.page());
    });
  }


  loadArtworks(page: number) {
  this.isLoading.set(true);
  
  const params = new HttpParams()
  .set('fields', 'id,title,description,place_of_origin')
  .set('limit', '2')
  .set('page', page);

  this.http.get<ArtworksResponse>(this.baseUrl, { params }).subscribe((res) => {
    this.artworks.set(res.data);
    this.maxPages.set(res.pagination.total_pages);
    this.isLoading.set(false);
  });}

  nextPage() {
  this.page.update((p) => p + 1);
  }


  prevPage() {
  this.page.update((p) => Math.max(1, p - 1));
  }
}
