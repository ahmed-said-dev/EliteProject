import type { Schema, Struct } from '@strapi/strapi';

export interface MembershipFeature extends Struct.ComponentSchema {
  collectionName: 'components_membership_features';
  info: {
    description: 'Membership plan features with inclusion indicator';
    displayName: 'Feature';
    icon: 'check-square';
  };
  attributes: {
    isIncluded: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'Frequently Asked Questions item with question and answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedServiceFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_features';
  info: {
    description: '\u0645\u064A\u0632\u0627\u062A \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0629';
    displayName: 'Service Feature';
    icon: 'list';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceIcon extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_icons';
  info: {
    description: '\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0629 \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A';
    displayName: 'Service Icon';
    icon: 'brush';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A';
    displayName: 'socialLinks';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSpecialties extends Struct.ComponentSchema {
  collectionName: 'components_shared_specialties';
  info: {
    description: '\u0645\u0643\u0648\u0646 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A \u0644\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642';
    displayName: 'specialties';
    icon: 'dashboard';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UnifiedHomeFields extends Struct.ComponentSchema {
  collectionName: 'components_unified_home_fields';
  info: {
    description: 'Fields used for Home page service cards';
    displayName: 'home-fields';
  };
  attributes: {
    iconName: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UnifiedPageFields extends Struct.ComponentSchema {
  collectionName: 'components_unified_page_fields';
  info: {
    description: 'Fields used for Services page details';
    displayName: 'page-fields';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    faq: Schema.Attribute.Component<'shared.faq-item', true>;
    features: Schema.Attribute.Component<'shared.service-feature', true>;
    icons: Schema.Attribute.Component<'shared.service-icon', true>;
    image: Schema.Attribute.Media<'images'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'membership.feature': MembershipFeature;
      'shared.faq-item': SharedFaqItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.service-feature': SharedServiceFeature;
      'shared.service-icon': SharedServiceIcon;
      'shared.slider': SharedSlider;
      'shared.social-links': SharedSocialLinks;
      'shared.specialties': SharedSpecialties;
      'unified.home-fields': UnifiedHomeFields;
      'unified.page-fields': UnifiedPageFields;
    }
  }
}
