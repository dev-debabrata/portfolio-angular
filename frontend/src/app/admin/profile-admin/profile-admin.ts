import { Component, signal } from '@angular/core';
import { AdminProfile } from '../admin-profile/admin-profile';
import { AdminAbout } from '../admin-about/admin-about';
import { SkillList } from '../skills/skill-list/skill-list';
import { ExperienceList } from '../experiences/experience-list/experience-list';
import { AdminResume } from '../admin-resume/admin-resume';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [AdminProfile, AdminAbout, SkillList, ExperienceList, AdminResume],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {
  activeTab = signal<'image' | 'about' | 'skills' | 'experience' | 'resume'>('image');
}
