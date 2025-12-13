export interface HeroStat {
  value: string;
  label: string;
  description?: string;
}

export interface HeroImage {
  url: string;
  caption?: string | null;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  highlight?: string;
  primaryCta: { label: string; target: string };
  secondaryCta: { label: string; target: string };
  imageUrl?: string;
  images?: HeroImage[];
  stats: HeroStat[];
}

export interface ServiceCard {
  title: string;
  description?: string;
  iconName?: string;
}

export interface ServiceCategory {
  title: string;
  description?: string;
  imageUrl?: string;
  items: string[];
}

export interface NewsBar {
  title: string;
  text: string;
  linkUrl?: string;
}

export interface BrandCard {
  name: string;
  logoUrl?: string;
  linkUrl?: string;
  description?: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  experience?: string;
  specialization?: string;
  imageUrl?: string;
}

export type ContactCardType = 'phone' | 'email' | 'address' | 'hours';

export interface ContactCard {
  type: ContactCardType;
  title: string;
  description?: string;
  lines: string[];
  actionValue?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HomepageContent {
  navigation: {
    phone: string;
    email: string;
    tagline: string;
  };
  hero: HeroContent;
  newsBar?: NewsBar;
  services: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    items: ServiceCard[];
  };
  serviceDetails: {
    heading: string;
    subheading?: string;
    categories: ServiceCategory[];
  };
  brands: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    items: BrandCard[];
  };
  team: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    members: TeamMember[];
    story?: string;
  };
  contact: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    cards: ContactCard[];
    mapEmbedUrl?: string;
    mapLabel?: string;
    mapDescription?: string;
  };
  footer: {
    description?: string;
    services: string[];
    legalText?: string;
  };
}
