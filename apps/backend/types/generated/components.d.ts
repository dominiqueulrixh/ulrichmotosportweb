import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsBrandCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_brand_cards';
  info: {
    displayName: 'Brand card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_cards';
  info: {
    displayName: 'Contact card';
  };
  attributes: {
    actionValue: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    lines: Schema.Attribute.Component<'sections.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['phone', 'email', 'address', 'hours']> &
      Schema.Attribute.Required;
  };
}

export interface SectionsHeroStat extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_stats';
  info: {
    displayName: 'Hero stat';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsListItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_list_items';
  info: {
    displayName: 'List item';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_service_cards';
  info: {
    displayName: 'Service card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    iconName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsServiceCategory extends Struct.ComponentSchema {
  collectionName: 'components_sections_service_categories';
  info: {
    displayName: 'Service category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'sections.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_social_links';
  info: {
    displayName: 'Social link';
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_members';
  info: {
    displayName: 'Team member';
  };
  attributes: {
    experience: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String;
    specialization: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.brand-card': SectionsBrandCard;
      'sections.contact-card': SectionsContactCard;
      'sections.hero-stat': SectionsHeroStat;
      'sections.list-item': SectionsListItem;
      'sections.service-card': SectionsServiceCard;
      'sections.service-category': SectionsServiceCategory;
      'sections.social-link': SectionsSocialLink;
      'sections.team-member': SectionsTeamMember;
    }
  }
}
