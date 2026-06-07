import { Routes } from '@angular/router';

import { AdminLayout } from './layout/admin-layout/admin-layout';
import { adminGuard } from '../core/guards/admin-guard';
import { AdminLogin } from './auth/admin-login/admin-login';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { AdminProjectList } from './pages/projects-admin/admin-project-list/admin-project-list';

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
        component: DashboardAdmin,
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
              import('./pages/projects-admin/admin-project-form/admin-project-form').then(
                (m) => m.AdminProjectForm,
              ),
          },

          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/projects-admin/admin-project-form/admin-project-form').then(
                (m) => m.AdminProjectForm,
              ),
          },
        ],
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs-admin/admin-blog-list/admin-blog-list').then(
            (m) => m.AdminBlogList,
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile-admin/profile-admin').then((m) => m.ProfileAdmin),
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
