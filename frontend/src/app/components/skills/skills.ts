import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SkillsService } from '../../core/services/skills.service';
import { SkillResponse } from '../../models/skills.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  private skillsService = inject(SkillsService);
  private destroyRef = inject(DestroyRef);

  skills = signal<SkillResponse[]>([]);

  categorySkills = computed(() => {
    const groups: { category: string; list: SkillResponse[] }[] = [];

    this.skills().forEach((skill) => {
      const category = skill.category || 'Others';

      const existing = groups.find((g) => g.category === category);

      if (existing) {
        existing.list.push(skill);
      } else {
        groups.push({
          category,
          list: [skill],
        });
      }
    });

    return groups;
  });

  ngOnInit(): void {
    const skillsSub = this.skillsService.getSkills().subscribe({
      next: (res) => {
        this.skills.set(res);
      },

      error: (err) => {
        console.log(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      skillsSub.unsubscribe();
    });
  }
}
