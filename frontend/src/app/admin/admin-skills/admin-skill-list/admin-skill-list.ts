import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AdminSkillForm } from '../admin-skill-form/admin-skill-form';
import { SkillsService } from '../../../core/services/skills.service';
import { SkillResponse } from '../../../models/skills.model';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-skill-list',
  standalone: true,
  imports: [AdminSkillForm, LucideAngularModule],
  templateUrl: './admin-skill-list.html',
  styleUrl: './admin-skill-list.css',
})
export class AdminSkillList implements OnInit {
  private skillsService = inject(SkillsService);
  private destroyRef = inject(DestroyRef);
  private snackBarService = inject(SnackBarService);

  skills = signal<SkillResponse[]>([]);

  showForm = signal(false);

  ngOnInit(): void {
    const skillsSub = this.skillsService.getSkills().subscribe({
      next: (res) => {
        this.skills.set(res);
        console.log(res);
      },
      error: (err) => {
        console.log('Skills are not show!', err);
      },
    });

    this.destroyRef.onDestroy(() => {
      skillsSub.unsubscribe();
    });
  }

  deleteSkill(id: string) {
    const confirmed = confirm('Are you sure delete this skill?');

    if (!confirmed) {
      return;
    }

    const skillSub = this.skillsService.deleteSkill(id).subscribe({
      next: (res) => {
        this.skills.update((skills) => skills.filter((skill) => skill._id !== id));
        this.snackBarService.success(res.message);
      },
      error: (err) => {
        this.snackBarService.error(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      skillSub.unsubscribe();
    });
  }

  openForm() {
    this.showForm.set(true);
  }

  closeForm(newSkill?: SkillResponse) {
    this.showForm.set(false);
    if (newSkill) {
      this.skills.update((skills) => [...skills, newSkill]);
    }
  }
}
