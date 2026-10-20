import {
  ORGANIZATION_DESCRIPTION,
  PRODUCT_DESCRIPTION,
  SEO_CHECKOUT_URL,
  SEO_IN_LANGUAGE,
  SEO_SITE_NAME,
  SEO_SITE_ORIGIN,
  SEO_SUPPORT_EMAIL,
} from '../data/seo/constants';
import { SEO_FAQ_ITEMS } from '../data/seo/faq';
import { SEO_BLOG_ITEM_LIST, SEO_REVIEW_ITEM_LIST } from '../data/seo/lists';
import type { PageMeta } from '../data/seo/pages';
function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SEO_SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildSeoGraph(meta: PageMeta, pageUrl: string): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [];

  graph.push({
    '@type': 'WebSite',
    '@id': `${SEO_SITE_ORIGIN}/#website`,
    url: SEO_SITE_ORIGIN,
    name: SEO_SITE_NAME,
    description: ORGANIZATION_DESCRIPTION,
    inLanguage: SEO_IN_LANGUAGE,
  });

  graph.push({
    '@type': 'Organization',
    '@id': `${SEO_SITE_ORIGIN}/#organization`,
    name: SEO_SITE_NAME,
    url: SEO_SITE_ORIGIN,
    email: SEO_SUPPORT_EMAIL,
    areaServed: 'Worldwide',
    logo: {
      '@type': 'ImageObject',
      url: abs('/images/enlisted-hacks-logo.png'),
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SEO_SUPPORT_EMAIL,
      areaServed: 'Worldwide',
      availableLanguage: SEO_IN_LANGUAGE,
    },
  });

  graph.push({
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: SEO_IN_LANGUAGE,
    isPartOf: { '@id': `${SEO_SITE_ORIGIN}/#website` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: abs(meta.ogImage),
    },
  });

  if (meta.breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: meta.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: abs(crumb.path),
      })),
    });
  }

  if (meta.includeProduct) {
    graph.push({
      '@type': 'Product',
      '@id': `${pageUrl}#product`,
      name: SEO_SITE_NAME,
      brand: { '@type': 'Brand', name: SEO_SITE_NAME },
      description: PRODUCT_DESCRIPTION,
      image: abs('/images/enlisted-hacks-combat.webp'),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.4,
        reviewCount: 10,
        bestRating: 5,
        worstRating: 1,
      },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: 35.0,
        highPrice: 150.0,
        priceCurrency: 'USD',
        offerCount: 2,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: SEO_CHECKOUT_URL,
        offers: [
          {
            '@type': 'Offer',
            name: 'Monthly',
            price: 35.0,
            priceCurrency: 'USD',
            url: SEO_CHECKOUT_URL,
          },
          {
            '@type': 'Offer',
            name: 'Lifetime',
            price: 150.0,
            priceCurrency: 'USD',
            url: SEO_CHECKOUT_URL,
          },
        ],
      },
    });
  }

  if (meta.includeFaqPage) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: SEO_FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  if (meta.includeBlogCollection) {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#collection`,
      name: meta.title,
      description: meta.description,
      url: pageUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SEO_BLOG_ITEM_LIST.map((post, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: post.name,
          url: abs(post.url),
        })),
      },
    });
  }

  if (meta.includeReviewItemList) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#reviews`,
      itemListElement: SEO_REVIEW_ITEM_LIST.map((review, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: review.name,
      })),
    });
  }

  return graph;
}
