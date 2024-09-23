interface INavLink {
  title: string;
  url: string;
  description?: string;
}

interface IPasswords {
  password: string;
  repeatedPassword: string;
}

export type { INavLink, IPasswords };
