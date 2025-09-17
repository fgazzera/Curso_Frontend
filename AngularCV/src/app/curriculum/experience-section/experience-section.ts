import { Component, Input } from '@angular/core';
import { Experience } from '../resume.models';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss'
})
export class ExperienceSectionComponent {
  @Input() experiences: Experience[] = [];
}
