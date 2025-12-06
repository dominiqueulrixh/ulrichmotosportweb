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

type MediaInput = string | StrapiMedia | StrapiMediaWrapper | null | undefined;

// Single oder multiple media
type MediaRelation =
    | { data?: MediaInput | null }      // single
    | { data?: MediaInput[] | null };   // multiple

type MediaCollection = MediaInput | MediaInput[] | MediaRelation;

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

type StrapiMediaWrapper = {
  data?: { attributes?: StrapiMedia | null } | StrapiMedia | null;
};

const mediaUrl = (
    value?: string | StrapiMedia | StrapiMediaWrapper | { attributes?: unknown } | null
): string | undefined => {
  if (!value) return undefined;

  // 1) Direkter String → direkt URL bauen
  if (typeof value === 'string') return absoluteUrl(value);

  let mediaCandidate: any = value;

  // 2) Falls es ein Wrapper mit .data ist (Relation / Media-Feld)
  if (mediaCandidate && typeof mediaCandidate === 'object' && 'data' in mediaCandidate && mediaCandidate.data) {
    const data = (mediaCandidate as { data: any }).data;
    mediaCandidate = data.attributes ?? data;
  }

  // 3) Falls wir direkt ein Objekt mit .attributes bekommen (z.B. aus Schritt 2 oder bei manchen Antworten)
  if (mediaCandidate && typeof mediaCandidate === 'object' && 'attributes' in mediaCandidate) {
    mediaCandidate = (mediaCandidate as { attributes: any }).attributes;
  }

  if (!mediaCandidate) return undefined;

  // 4) Jetzt sollte mediaCandidate endlich etwas im Stil von StrapiMedia sein
  const urlFromSelf = (mediaCandidate as StrapiMedia).url ?? null;

  let urlFromFormats: string | null = null;
  if (!urlFromSelf && (mediaCandidate as StrapiMedia).formats) {
    const firstFormatWithUrl = Object.values((mediaCandidate as StrapiMedia).formats!)
        .filter(Boolean)
        .find((fmt: any) => fmt && fmt.url);
    urlFromFormats = (firstFormatWithUrl as { url?: string | null } | undefined)?.url ?? null;
  }

  const rawUrl = urlFromSelf ?? urlFromFormats;
  return rawUrl ? absoluteUrl(rawUrl) : undefined;
};


const mediaUrls = (value?: MediaCollection): string[] => {
  if (!value) return [];

  const items: MediaInput[] = [];

  const pushIf = (item?: MediaInput | null) => {
    if (item) items.push(item);
  };

  if (Array.isArray(value)) {
    // direkt ein Array von MediaInputs
    items.push(...value);
  } else if (typeof value === 'object' && value !== null && 'data' in value) {
    const data = (value as { data?: MediaInput | MediaInput[] | null }).data;

    if (Array.isArray(data)) {
      // multiple media
      items.push(...data);
    } else {
      // single media (data ist ein Objekt oder null)
      pushIf(data as MediaInput | null | undefined);
    }
  } else {
    // einzelner Wert (String, StrapiMedia, StrapiMediaWrapper, ...)
    items.push(value as MediaInput);
  }

  return items
      .map(entry => mediaUrl(entry))
      .filter((url): url is string => Boolean(url));
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

const unwrapEntity = <T>(value: T | { attributes?: T }): T => {
  if (value && typeof value === 'object' && 'attributes' in (value as Record<string, unknown>)) {
    return (value as { attributes?: T }).attributes ?? (value as T);
  }
  return value as T;
};

const unwrapCollection = <T>(value?: Array<T> | { data?: Array<T> | null } | null): Array<T> => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && Array.isArray((value as { data?: Array<T> }).data)) {
    return (value as { data?: Array<T> }).data ?? [];
  }
  return [];
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
  image?: MediaCollection;
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
  legalText?: string | null;
}>;

const mapNavigation = (data: NavigationApiResponse): HomepageContent['navigation'] => ({
  phone: data.phone ?? '',
  email: data.email ?? '',
  tagline: data.tagline ?? ''
});

const mapHero = (data: HeroApiResponse): HomepageContent['hero'] => {
  const imageUrls = mediaUrls(data.image);
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
    imageUrl: imageUrls[0],
    images: imageUrls,
    stats
  };
};

const mapServicesSection = (data: ServiceSectionApiResponse): HomepageContent['services'] => {
  const services: ServiceCard[] =
    unwrapCollection(data.items).map(rawService => {
      const service = unwrapEntity(rawService) as ServiceCard;
      return {
        title: service?.title ?? '',
        description: service?.description ?? '',
        iconName: service?.iconName ?? 'Wrench'
      };
    });

  return {
    eyebrow: data.eyebrow ?? '',
    heading: data.heading ?? '',
    subheading: data.subheading ?? '',
    items: services
  };
};

const mapServiceDetails = (data: ServiceSectionApiResponse): HomepageContent['serviceDetails'] => {
  const categories: ServiceCategory[] =
    unwrapCollection(data.categories).map(rawCategory => {
      const category = unwrapEntity(rawCategory) as ServiceCategory & { image?: unknown; imageUrl?: unknown };
      return {
        title: category?.title ?? '',
        description: category?.description ?? '',
        imageUrl: mediaUrl(category?.image ?? category?.imageUrl),
        items: normalizeTextList((category as { items?: TextListItem[] }).items)
      };
    });

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
  const members = unwrapCollection(data.members).map(member => unwrapEntity(member));

  const teamMembers: TeamMember[] = members.map(member => ({
    name: (member as TeamMember)?.name ?? '',
    role: (member as TeamMember)?.role ?? '',
    experience: (member as TeamMember)?.experience ?? '',
    specialization: (member as TeamMember)?.specialization ?? '',
    imageUrl: mediaUrl(
      (member as TeamMember & { photo?: unknown; image?: unknown; imageUrl?: unknown }).photo ??
        (member as TeamMember & { image?: unknown }).image ??
        (member as TeamMember & { imageUrl?: unknown }).imageUrl
    )
  }));

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
  return {
    description: data.description ?? '',
    services: normalizeTextList(data.services),
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
