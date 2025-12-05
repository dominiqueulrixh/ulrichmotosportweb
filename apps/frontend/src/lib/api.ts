import type {
  BrandCard,
  ContactCard,
  HeroContent,
  HomepageContent,
  ServiceCard,
  ServiceCategory,
  SocialLink,
  TeamMember
} from '../types/homepage';

type EntityIds = {
  id?: number | string;
  documentId?: string;
};

type StrapiData<T> = T & EntityIds;

export type StrapiResponse<T> = {
  data: StrapiData<T>;
};

type StrapiMedia = EntityIds & {
  url?: string | null;
  formats?: Record<string, { url?: string | null } | null>;
};

type TextListItem = EntityIds & { text?: string | null };

type FetchOptions = {
  stripIds?: boolean;
};

const API_URL = (
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_STRAPI_URL ??
    'http://localhost:1437'
).replace(/\/$/, '');

;(window as any).__API_URL_TEST__ = API_URL;
console.log('API_URL =', API_URL);


const withLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);

const absoluteUrl = (maybeRelative: string): string => {
  if (!maybeRelative) return '';
  if (maybeRelative.startsWith('http')) return maybeRelative;
  return `${API_URL}${withLeadingSlash(maybeRelative)}`;
};

const mediaUrl = (value?: string | StrapiMedia | null): string | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') return absoluteUrl(value);

  const rawUrl = value.url ?? Object.values(value.formats ?? {}).find(Boolean)?.url;
  return rawUrl ? absoluteUrl(rawUrl) : undefined;
};

const stripIdsDeep = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map(item => stripIdsDeep(item)) as unknown as T;
  }

  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, entryValue]) => {
      if (key === 'id' || key === 'documentId') {
        return;
      }
      result[key] = stripIdsDeep(entryValue);
    });
    return result as unknown as T;
  }

  return value;
};

const buildUrl = (path: string, params?: Record<string, string | number | undefined> | string) => {
  const url = new URL(`${API_URL}${withLeadingSlash(path)}`);

  if (typeof params === 'string') {
    url.search = params;
  } else if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}` !== '') {
        url.searchParams.set(key, `${value}`);
      }
    });
  }

  return url.toString();
};

export async function fetchSingleType<T>(
  uid: string,
  populate: string | undefined = '*',
  options: FetchOptions = {}
): Promise<T> {
  const queryParams = populate ? { populate } : undefined;
  const response = await fetch(buildUrl(`/api/${uid}`, queryParams), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Strapi request for ${uid} failed with status ${response.status}`);
  }

  const json: StrapiResponse<T> = await response.json();
  if (!json?.data) {
    throw new Error(`Strapi response for ${uid} is missing data`);
  }

  const data = options.stripIds ? stripIdsDeep(json.data) : json.data;

  // Prefer v5 shape (data contains the fields directly); keep v4 fallback just in case.
  const payload = (data as unknown as { attributes?: T }).attributes ?? data;
  return payload as T;
}

const normalizeTextList = (items?: TextListItem[] | null): string[] =>
  (items ?? [])
    .map(item => item?.text ?? '')
    .map(entry => entry.trim())
    .filter(Boolean);

type NavigationApiResponse = StrapiData<{
  phone?: string | null;
  email?: string | null;
  tagline?: string | null;
}>;

type HeroApiResponse = StrapiData<{
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaTarget?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaTarget?: string | null;
  image?: string | StrapiMedia | null;
  stats?: Array<StrapiData<Partial<HeroContent['stats'][number]>>>;
}>;

type ServiceSectionApiResponse = StrapiData<{
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  items?: Array<StrapiData<Partial<ServiceCard>>>;
  detailsHeading?: string | null;
  detailsSubheading?: string | null;
  categories?: Array<
    StrapiData<
      Partial<ServiceCategory> & {
        image?: string | StrapiMedia | null;
        items?: TextListItem[] | null;
      }
    >
  >;
}>;

type BrandSectionApiResponse = StrapiData<{
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  items?: Array<StrapiData<Partial<BrandCard>>>;
}>;

type TeamApiResponse = StrapiData<{
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  members?: Array<
    StrapiData<
      Partial<TeamMember> & {
        photo?: string | StrapiMedia | null;
        image?: string | StrapiMedia | null;
        imageUrl?: string | StrapiMedia | null;
      }
    >
  >;
  story?: string | null;
}>;

type ContactApiResponse = StrapiData<{
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  cards?: Array<
    StrapiData<
      Partial<ContactCard> & {
        lines?: TextListItem[] | null;
      }
    >
  >;
  mapEmbedUrl?: string | null;
  mapLabel?: string | null;
  mapDescription?: string | null;
}>;

type FooterApiResponse = StrapiData<{
  description?: string | null;
  services?: TextListItem[] | null;
  socials?: Array<StrapiData<Partial<SocialLink>>>;
  legalText?: string | null;
}>;

const mapNavigation = (data: NavigationApiResponse): HomepageContent['navigation'] => ({
  phone: data.phone ?? '',
  email: data.email ?? '',
  tagline: data.tagline ?? ''
});

const mapHero = (data: HeroApiResponse): HomepageContent['hero'] => {
  const stats: HeroContent['stats'] =
    data.stats?.map(stat => ({
      value: stat?.value ?? '',
      label: stat?.label ?? '',
      description: stat?.description ?? ''
    })) ?? [];

  return {
    eyebrow: data.eyebrow ?? '',
    title: data.title ?? '',
    highlight: data.highlight ?? '',
    primaryCta: {
      label: data.primaryCtaLabel ?? '',
      target: data.primaryCtaTarget ?? 'contact'
    },
    secondaryCta: {
      label: data.secondaryCtaLabel ?? '',
      target: data.secondaryCtaTarget ?? 'services'
    },
    imageUrl: mediaUrl(data.image),
    stats
  };
};

const mapServicesSection = (data: ServiceSectionApiResponse): HomepageContent['services'] => {
  const services: ServiceCard[] =
    data.items?.map(service => ({
      title: service?.title ?? '',
      description: service?.description ?? '',
      iconName: service?.iconName ?? 'Wrench'
    })) ?? [];

  return {
    eyebrow: data.eyebrow ?? '',
    heading: data.heading ?? '',
    subheading: data.subheading ?? '',
    items: services
  };
};

const mapServiceDetails = (data: ServiceSectionApiResponse): HomepageContent['serviceDetails'] => {
  const categories: ServiceCategory[] =
    data.categories?.map(category => ({
      title: category?.title ?? '',
      description: category?.description ?? '',
      imageUrl: mediaUrl(category?.image ?? category?.imageUrl),
      items: normalizeTextList(category?.items)
    })) ?? [];

  return {
    heading: data.detailsHeading ?? '',
    subheading: data.detailsSubheading ?? '',
    categories
  };
};

const mapBrandSection = (data: BrandSectionApiResponse): HomepageContent['brands'] => {
  const brands: BrandCard[] =
    data.items?.map(brand => ({
      name: brand?.name ?? '',
      description: brand?.description ?? ''
    })) ?? [];

  return {
    eyebrow: data.eyebrow ?? '',
    heading: data.heading ?? '',
    subheading: data.subheading ?? '',
    items: brands
  };
};

const mapTeamSection = (data: TeamApiResponse): HomepageContent['team'] => {
  const teamMembers: TeamMember[] =
    data.members?.map(member => ({
      name: member?.name ?? '',
      role: member?.role ?? '',
      experience: member?.experience ?? '',
      specialization: member?.specialization ?? '',
      imageUrl: mediaUrl(member?.photo ?? member?.image ?? member?.imageUrl)
    })) ?? [];

  return {
    eyebrow: data.eyebrow ?? '',
    heading: data.heading ?? '',
    subheading: data.subheading ?? '',
    members: teamMembers,
    story: data.story ?? ''
  };
};

const mapContactSection = (data: ContactApiResponse): HomepageContent['contact'] => {
  const contactCards: ContactCard[] =
    data.cards?.map(card => ({
      type: card?.type ?? 'phone',
      title: card?.title ?? '',
      description: card?.description ?? '',
      lines: normalizeTextList(card?.lines),
      actionValue: card?.actionValue ?? ''
    })) ?? [];

  return {
    eyebrow: data.eyebrow ?? '',
    heading: data.heading ?? '',
    subheading: data.subheading ?? '',
    cards: contactCards,
    mapEmbedUrl: data.mapEmbedUrl ?? '',
    mapLabel: data.mapLabel ?? '',
    mapDescription: data.mapDescription ?? ''
  };
};

const mapFooter = (data: FooterApiResponse): HomepageContent['footer'] => {
  const socials: SocialLink[] =
    data.socials?.map(social => ({
      platform: social?.platform ?? '',
      url: social?.url ?? '#'
    })) ?? [];

  return {
    description: data.description ?? '',
    services: normalizeTextList(data.services),
    socials,
    legalText: data.legalText ?? ''
  };
};

export async function fetchHomepageContent(): Promise<HomepageContent> {
  const [
    navigation,
    hero,
    services,
    brands,
    team,
    contact,
    footer
  ] = await Promise.all([
    fetchSingleType<NavigationApiResponse>('navigation', '*', { stripIds: true }),
    fetchSingleType<HeroApiResponse>('hero', '*', { stripIds: true }),
    fetchSingleType<ServiceSectionApiResponse>('service-section', '*', { stripIds: true }),
    fetchSingleType<BrandSectionApiResponse>('brand-section', '*', { stripIds: true }),
    fetchSingleType<TeamApiResponse>('team', '*', { stripIds: true }),
    fetchSingleType<ContactApiResponse>('contact', '*', { stripIds: true }),
    fetchSingleType<FooterApiResponse>('footer', '*', { stripIds: true })
  ]);

  return {
    navigation: mapNavigation(navigation),
    hero: mapHero(hero),
    services: mapServicesSection(services),
    serviceDetails: mapServiceDetails(services),
    brands: mapBrandSection(brands),
    team: mapTeamSection(team),
    contact: mapContactSection(contact),
    footer: mapFooter(footer)
  };
}
