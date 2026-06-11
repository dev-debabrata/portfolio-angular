import { Routes } from '@angular/router';

import { AdminLayout } from './layout/admin-layout/admin-layout';
import { adminGuard } from '../core/guards/admin-guard';
import { AdminLogin } from './auth/admin-login/admin-login';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { AdminProjectList } from './pages/projects-admin/admin-project-list/admin-project-list';
import { AdminBlogList } from './pages/blogs-admin/admin-blog-list/admin-blog-list';

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

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile-admin/profile-admin').then((m) => m.ProfileAdmin),
      },

      {
        path: 'projects',
        children: [
          {
            path: '',
            component: AdminProjectList,
          },

          {
            path: 'add',
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

          {
            path: ':id',
            loadComponent: () =>
              import('./pages/projects-admin/admin-project-detail/admin-project-detail').then(
                (m) => m.AdminProjectDetail,
              ),
          },
        ],
      },

      {
        path: 'blogs',
        children: [
          {
            path: '',
            component: AdminBlogList,
          },

          {
            path: 'add',
            loadComponent: () =>
              import('./pages/blogs-admin/admin-blog-form/admin-blog-form').then(
                (m) => m.AdminBlogForm,
              ),
          },

          {
            path: 'edit/:slug',
            loadComponent: () =>
              import('./pages/blogs-admin/admin-blog-form/admin-blog-form').then(
                (m) => m.AdminBlogForm,
              ),
          },

          {
            path: ':slug',
            loadComponent: () =>
              import('./pages/blogs-admin/admin-blog-detail/admin-blog-detail').then(
                (m) => m.AdminBlogDetail,
              ),
          },
        ],
      },
    ],
  },
];
