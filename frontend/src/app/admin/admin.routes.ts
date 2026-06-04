import { Routes } from '@angular/router';

import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Dashboard } from './dashboard/dashboard';

import { adminGuard } from '../core/guards/admin-guard';
import { AdminLogin } from './admin-login/admin-login';
import { BlogList } from './blogs/blog-list/blog-list';
import { ExperienceList } from './experiences/experience-list/experience-list';
import { SkillList } from './skills/skill-list/skill-list';
import { AdminProjectList } from './projects/admin-project-list/admin-project-list';

// import { ProjectForm } from './projects/project-form/project-form';
// import { ProjectEdit } from './projects/project-edit/project-edit';
// import { Messages } from './messages/messages';
// import { adminGuard } from '../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    component: AdminLogin,
    canActivate: [adminGuard],
  },

  {
    path: '',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },

      // {
      //   path: 'about',
      //   loadComponent: () => import('./about/create-about/create-about').then((m) => m.CreateAbout),
      // },

      {
        path: 'projects',
        children: [
          {
            path: '',
            component: AdminProjectList,
          },
          {
            path: 'add-project',
            loadComponent: () =>
              import('./projects/admin-project-form/admin-project-form').then(
                (m) => m.AdminProjectForm,
              ),
          },

          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./projects/admin-project-form/admin-project-form').then(
                (m) => m.AdminProjectForm,
              ),
          },
        ],
      },
      {
        path: 'blogs',
        loadComponent: () => import('./blogs/blog-list/blog-list').then((m) => m.BlogList),
      },

      {
        path: 'profile',
        loadComponent: () => import('./profile-admin/profile-admin').then((m) => m.ProfileAdmin),
      },
      // {
      //   path: 'experience',
      //   loadComponent: () =>
      //     import('./experiences/experience-list/experience-list').then((m) => m.ExperienceList),
      // },

      // {
      //   path: 'skills',
      //   loadComponent: () => import('./skills/skill-list/skill-list').then((m) => m.SkillList),
      // },

      // {
      //   path: 'profile',
      //   loadComponent: () => import('./admin-profile/admin-profile').then((m) => m.AdminProfile),
      // },

      // {
      //   path: 'resume',
      //   loadComponent: () => import('./admin-resume/admin-resume').then((m) => m.AdminResume),
      // },

      //   {
      //     path: 'projects/edit/:id',
      //     component: ProjectEdit,
      //   },
      //   {
      //     path: 'messages',
      //     component: Messages,
      //   },
    ],
  },
];
