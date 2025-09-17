import { Component, Input } from '@angular/core';
import { ContactLink, ProfileSummary } from '../resume.models';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: ProfileSummary;
  @Input() contactLinks: ContactLink[] = [];
}
