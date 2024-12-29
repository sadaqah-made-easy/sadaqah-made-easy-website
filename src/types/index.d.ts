export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type TPaymentMethod = {
  mobile_banking: {
    type: string;
    image: string;
    number: string;
    reference: string;
    accountType: string;
  }[];
  bank: {
    type: string;
    image: string;
    details: {
      name: string;
      account: string;
      accountName: string;
      branch: string;
      reference: string;
    };
  };
};

export type TDonationGoals = {
  enable: boolean;
  amount: string;
  payment_methods: TPaymentMethod;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    organizer: string;
    tags: string[];
    date?: string;
    draft?: boolean;
    project_end_date?: { enable: boolean; end_date: string };
    donation_goals?: TDonationGoals;
  };
  slug?: string;
  content?: string;
};

export type TOrganizer = {
  slug: string;
  frontmatter: {
    title: string;
    image: string;
    description: string;
    website: string;
    facebook: string;
    twitter: string;
    draft: boolean;
    email: string;
  };
  content: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

export type TMenuItem = {
  name: string;
  url: string;
  icon?: string;
};

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}
