import { Component, Input } from '@angular/core';
import { LanguageSkill, SkillGroup } from '../resume.models';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss'
})
export class SkillsSectionComponent {
  @Input() skills: SkillGroup[] = [];
  @Input() languages: LanguageSkill[] = [];
}
