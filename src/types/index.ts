import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

// Question Manager types

export type newQuestionFormat = {
  question: string;
  alternativeQuestions: string[];
  answers: string[];
};

export type questionAlternative = {
  id: string;
  question: string;
};

export type answer = {
  id: string;
  answer: string;
};

export type TagType = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type questionType = {
  id: string;
  question: string;
  alternativeQuestions: questionAlternative[];
  answers: answer[];
  tags?: TagType[];
};

export type tagType = {
  id: string;
  name: string;
  slug: string;
};

export type originType = {
  id: string;
  name: string;
  slug: string;
  url?: string;
};

export type matcherType = {
  id: string;
  full_name: string;
  email?: string;
  linkedin?: string;
  phone?: string;
};
