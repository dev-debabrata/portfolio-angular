import { Component, signal } from '@angular/core';
import { AdminProfile } from '../admin-profile/admin-profile';
import { AdminAbout } from '../admin-about/admin-about';

import { ExperienceList } from '../experiences/experience-list/experience-list';

import { AdminSkillList } from '../admin-skills/admin-skill-list/admin-skill-list';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [AdminProfile, AdminAbout, ExperienceList, AdminSkillList],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {
  activeTab = signal<'image' | 'about' | 'skills' | 'experience'>('image');
}
