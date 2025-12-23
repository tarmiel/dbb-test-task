export const AppPaths = {
  home: {
    getHref: () => '/'
  },
  auth: {
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    }
  },
  app: {
    forms: {
      getHref: () => '/forms'
    },
    forms_new: {
      getHref: () => '/forms/new'
    },
    form: { getHref: (id: string) => `/forms/${id}` }
  }
} as const;
