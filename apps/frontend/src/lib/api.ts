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

type StrapiEntity<T> = (T & EntityIds) | (EntityIds & { attributes?: T | null });
type StrapiData<T> = StrapiEntity<T>;

export type StrapiSingleResponse<T> = {
  data: StrapiEntity<T>;
};

export type StrapiCollectionResponse<T> = {
  data?: Array<StrapiEntity<T>>;
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

  const json: StrapiSingleResponse<T> = await response.json();
  if (!json?.data) {
    throw new Error(`Strapi response for ${uid} is missing data`);
  }

  const data = options.stripIds ? stripIdsDeep(json.data) : json.data;
  const payload = (data as unknown as { attributes?: T }).attributes ?? data;
  return payload as T;
}

export async function fetchFirstCollectionEntry<T>(
  collection: string,
  populate: string | undefined = '*',
  options: FetchOptions = {}
): Promise<T> {
  const queryParams = {
    ...(populate ? { populate } : {}),
    'pagination[page]': 1,
    'pagination[pageSize]': 1,
    sort: 'createdAt:desc'
  };
  const response = await fetch(buildUrl(`/api/${collection}`, queryParams), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Strapi request for ${collection} failed with status ${response.status}`);
  }

  const json: StrapiCollectionResponse<T> = await response.json();
  const first = unwrapCollection(json?.data)[0];
  if (!first) {
    throw new Error(`Strapi response for ${collection} is empty`);
  }

  const data = options.stripIds ? stripIdsDeep(first) : first;

  // Prefer v5 shape (entity under attributes); keep v4 fallback just in case.
  const payload = (data as unknown as { attributes?: T }).attributes ?? data;
  return payload as T;
}

export async function fetchCollection<T>(
  collection: string,
  populate: string | undefined = '*',
  options: FetchOptions = {},
  extraParams: Record<string, string | number | undefined> = {}
): Promise<Array<T>> {
  const queryParams = {
    ...(populate ? { populate } : {}),
    'pagination[page]': 1,
    'pagination[pageSize]': 200,
    ...extraParams
  };
  const response = await fetch(buildUrl(`/api/${collection}`, queryParams), {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Strapi request for ${collection} failed with status ${response.status}`);
  }

  const json: StrapiCollectionResponse<T> = await response.json();
  const items = unwrapCollection(json?.data).map(entry => {
    const data = options.stripIds ? stripIdsDeep(entry) : entry;
    return ((data as unknown as { attributes?: T }).attributes ?? data) as T;
  });

  return items;
}

const splitLines = (value?: string | null): string[] =>
  (value ?? '')
    .split(/\r?\n/)
    .map(entry => entry.trim())
    .filter(Boolean);

const normalizeNewlines = (value?: string | null): string =>
  (value ?? '').replace(/\\n/g, '\n');

type NavigationApiResponse = {
  phone?: string | null;
  email?: string | null;
  tagline?: string | null;
};

type HeroApiResponse = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaTarget?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaTarget?: string | null;
  image?: MediaCollection;
  gallery?: MediaCollection;
};

type HeroStatEntry = {
  value?: string | null;
  label?: string | null;
  description?: string | null;
  order?: number | null;
};

type ServiceSectionMeta = {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  detailsHeading?: string | null;
  detailsSubheading?: string | null;
};

type ServiceCardEntry = {
  title?: string | null;
  description?: string | null;
  iconName?: string | null;
  order?: number | null;
};

type ServiceCategoryEntry = {
  title?: string | null;
  description?: string | null;
  image?: MediaCollection;
  itemsText?: string | null;
  order?: number | null;
};

type BrandSectionMeta = {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
};

type BrandEntry = {
  name?: string | null;
  description?: string | null;
  logo?: MediaCollection;
  linkUrl?: string | null;
  order?: number | null;
};

type TeamSectionMeta = {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  story?: string | null;
};

type TeamMemberEntry = {
  name?: string | null;
  role?: string | null;
  experience?: string | null;
  specialization?: string | null;
  photo?: MediaCollection;
  image?: MediaCollection;
  imageUrl?: MediaCollection;
  order?: number | null;
};

type ContactSectionMeta = {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  mapEmbedUrl?: string | null;
  mapLabel?: string | null;
  mapDescription?: string | null;
};

type ContactCardEntry = {
  type?: ContactCard['type'] | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  hours?: string | null;
  title?: string | null;
  description?: string | null;
  linesText?: string | null;
  actionValue?: string | null;
  order?: number | null;
};

type FooterApiResponse = {
  description?: string | null;
  servicesText?: string | null;
  legalText?: string | null;
};

const mapNavigation = (data: NavigationApiResponse): HomepageContent['navigation'] => ({
  phone: data.phone ?? '',
  email: data.email ?? '',
  tagline: data.tagline ?? ''
});

const mapHero = (data: HeroApiResponse, statsData: HeroStatEntry[]): HomepageContent['hero'] => {
  const title = normalizeNewlines(data.title);
  const galleryUrls = mediaUrls(data.gallery);
  const imageUrls = galleryUrls.length > 0 ? galleryUrls : mediaUrls(data.image);
  const stats: HeroContent['stats'] =
    (statsData ?? []).map(stat => ({
      value: stat?.value ?? '',
      label: stat?.label ?? '',
      description: stat?.description ?? ''
    }));

  return {
    eyebrow: data.eyebrow ?? '',
    title,
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

const mapServicesSection = (
  meta: ServiceSectionMeta,
  serviceCards: ServiceCardEntry[]
): HomepageContent['services'] => {
  const services: ServiceCard[] = (serviceCards ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(service => ({
      title: service?.title ?? '',
      description: service?.description ?? '',
      iconName: service?.iconName ?? 'Wrench'
    }));

  return {
    eyebrow: meta.eyebrow ?? '',
    heading: meta.heading ?? '',
    subheading: meta.subheading ?? '',
    items: services
  };
};

const mapServiceDetails = (
  meta: ServiceSectionMeta,
  categoriesData: ServiceCategoryEntry[]
): HomepageContent['serviceDetails'] => {
  const categories: ServiceCategory[] = (categoriesData ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(category => ({
      title: category?.title ?? '',
      description: category?.description ?? '',
      imageUrl: mediaUrl(category?.image),
      items: splitLines(category?.itemsText)
    }));

  return {
    heading: meta.detailsHeading ?? '',
    subheading: meta.detailsSubheading ?? '',
    categories
  };
};

const mapBrandSection = (
  meta: BrandSectionMeta,
  brandsData: BrandEntry[]
): HomepageContent['brands'] => {
  const brands: BrandCard[] = (brandsData ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(brand => ({
      name: brand?.name ?? '',
      description: brand?.description ?? '',
      logoUrl: mediaUrl(brand?.logo),
      linkUrl: brand?.linkUrl ?? undefined
    }));

  return {
    eyebrow: meta.eyebrow ?? '',
    heading: meta.heading ?? '',
    subheading: meta.subheading ?? '',
    items: brands
  };
};

const mapTeamSection = (meta: TeamSectionMeta, membersData: TeamMemberEntry[]): HomepageContent['team'] => {
  const teamMembers: TeamMember[] = (membersData ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(member => ({
      name: member?.name ?? '',
      role: member?.role ?? '',
      experience: member?.experience ?? '',
      specialization: member?.specialization ?? '',
      imageUrl: mediaUrl(member?.photo ?? member?.image ?? member?.imageUrl)
    }));

  return {
    eyebrow: meta.eyebrow ?? '',
    heading: meta.heading ?? '',
    subheading: meta.subheading ?? '',
    members: teamMembers,
    story: meta.story ?? ''
  };
};

const mapContactSection = (
  meta: ContactSectionMeta,
  cardsData: ContactCardEntry[]
): HomepageContent['contact'] => {
  const contactCards: ContactCard[] = (cardsData ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(card => {
      const normalizedTitle = (card?.title ?? '').toLowerCase();
      const normalizedAsciiTitle = normalizedTitle
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const inferredType: ContactCard['type'] =
        (card?.type as ContactCard['type']) ??
        (card?.email ? 'email' : undefined) ??
        (card?.hours ? 'hours' : undefined) ??
        (card?.address ? 'address' : undefined) ??
        (card?.phone ? 'phone' : undefined) ??
        (normalizedTitle.includes('mail') ? 'email' : undefined) ??
        (normalizedAsciiTitle.includes('offnungs') || normalizedAsciiTitle.includes('oeffnungs') ? 'hours' : undefined) ??
        (normalizedTitle.includes('adresse') ? 'address' : undefined) ??
        'phone';

      return {
        type: inferredType,
        title: card?.title ?? '',
        description: card?.description ?? '',
        lines: splitLines(card?.linesText),
        actionValue: card?.actionValue ?? ''
      };
    });

  return {
    eyebrow: meta.eyebrow ?? '',
    heading: meta.heading ?? '',
    subheading: meta.subheading ?? '',
    cards: contactCards,
    mapEmbedUrl: meta.mapEmbedUrl ?? '',
    mapLabel: meta.mapLabel ?? '',
    mapDescription: meta.mapDescription ?? ''
  };
};

const mapFooter = (data: FooterApiResponse): HomepageContent['footer'] => {
  return {
    description: data.description ?? '',
    services: splitLines(data.servicesText),
    legalText: data.legalText ?? ''
  };
};

export async function fetchHomepageContent(): Promise<HomepageContent> {
  const [
    navigation,
    hero,
    heroStats,
    serviceMeta,
    serviceCards,
    serviceCategories,
    brandMeta,
    brandItems,
    teamMeta,
    teamMembers,
    contactMeta,
    contactCards,
    footer
  ] = await Promise.all([
    fetchSingleType<NavigationApiResponse>('navigation', '*', { stripIds: true }),
    fetchSingleType<HeroApiResponse>('hero', '*', { stripIds: true }),
    fetchCollection<HeroStatEntry>('hero-stats', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchSingleType<ServiceSectionMeta>('service-section', '*', { stripIds: true }),
    fetchCollection<ServiceCardEntry>('services', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchCollection<ServiceCategoryEntry>('service-categories', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchSingleType<BrandSectionMeta>('brand-section', '*', { stripIds: true }),
    fetchCollection<BrandEntry>('brands', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchSingleType<TeamSectionMeta>('team', '*', { stripIds: true }),
    fetchCollection<TeamMemberEntry>('team-members', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchSingleType<ContactSectionMeta>('contact', '*', { stripIds: true }),
    fetchCollection<ContactCardEntry>('contact-cards', '*', { stripIds: true }, { sort: 'order:asc' }),
    fetchSingleType<FooterApiResponse>('footer', '*', { stripIds: true })
  ]);

  return {
    navigation: mapNavigation(navigation),
    hero: mapHero(hero, heroStats),
    services: mapServicesSection(serviceMeta, serviceCards),
    serviceDetails: mapServiceDetails(serviceMeta, serviceCategories),
    brands: mapBrandSection(brandMeta, brandItems),
    team: mapTeamSection(teamMeta, teamMembers),
    contact: mapContactSection(contactMeta, contactCards),
    footer: mapFooter(footer)
  };
}
