import { Component, signal } from '@angular/core';

import { AdminProfile } from '../../components/admin-profile/admin-profile';
import { AdminAbout } from '../../components/admin-about/admin-about';
import { AdminSkillList } from '../../components/admin-skills/admin-skill-list/admin-skill-list';
import { AdminExperienceList } from '../../components/admin-experience/admin-experience-list/admin-experience-list';
import { AdminEducationList } from '../../components/admin-education/admin-education-list/admin-education-list';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [AdminProfile, AdminAbout, AdminSkillList, AdminExperienceList, AdminEducationList],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {
  activeTab = signal<'image' | 'about' | 'skills' | 'experience' | 'education'>('image');
}
