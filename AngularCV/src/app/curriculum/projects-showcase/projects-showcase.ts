import { Component, Input } from '@angular/core';
import { Project } from '../resume.models';

@Component({
  selector: 'app-projects-showcase',
  standalone: true,
  templateUrl: './projects-showcase.html',
  styleUrl: './projects-showcase.scss'
})
export class ProjectsShowcaseComponent {
  @Input() projects: Project[] = [];
}
