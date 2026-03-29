// TypeScript interface for the site configuration JSON
// Written by the worker's site-assembler step before astro build

export interface ComponentSelection {
  name: string;
  variant: string;
}

export interface SiteConfig {
  business: {
    name: string;
    phone: string;
    category: string;
    city: string;
    state: string;
  };
  design: {
    preset: {
      id: string;
      categoryGroup: string;
      name: string;
      colors: Record<string, string>;
      typography: Record<string, string>;
      shape: Record<string, string>;
      sections: {
        heroStyle: string;
        sectionAlternation: string[];
        animationStyle: string;
        spacingScale: string;
      };
      effects: string[];
      layout: {
        heroAlignment: string;
        contentWidth: string;
        gridStyle: string;
      };
      personality: {
        boldness: number;
        animationIntensity: string;
        spacingMultiplier: number;
      };
      compatibleComponents: Record<string, unknown[]>;
    };
    components: {
      nav: ComponentSelection;
      hero: ComponentSelection;
      services: ComponentSelection;
      testimonials: ComponentSelection;
      cta: ComponentSelection;
      gallery: ComponentSelection;
      contact: ComponentSelection;
      footer: ComponentSelection;
      trust: ComponentSelection;
    };
    activeEffects: string[];
    colorStrategy: "default" | "bold" | "inverted";
    sectionOrder: string[];
  };
  content: {
    homepage: {
      heroHeadline: string;
      heroSubline: string;
      aboutTitle: string;
      aboutText: string[];
      valueProps: Array<{ title: string; description: string; icon?: string }>;
      ctaHeadline: string;
      ctaSubline: string;
    };
    services: Array<{
      slug: string;
      name: string;
      shortDescription: string;
      description: string;
      process: string[];
      benefits: string[];
      faq: Array<{ question: string; answer: string }>;
    }>;
    serviceAreas: Array<{
      city: string;
      slug: string;
      state: string;
      content: string;
      localContext: string;
      nearbyAreas: string[];
    }>;
    reviews: Array<{
      name: string;
      rating: number;
      service: string;
      text: string;
      date: string;
    }>;
    seo: Record<string, { title: string; description: string; ogTitle?: string; ogDescription?: string }>;
    companyInfo: {
      yearsInBusiness: number;
      projectsCompleted: string;
      satisfaction: string;
      teamSize: string;
    };
  };
  images: {
    hero: string;
    about: string;
    services: Record<string, string>;
    gallery: string[];
  };
}

// Load site config — available at build time
import configData from "../site-config.json";
export const siteConfig = configData as SiteConfig;

// Helper: check if an effect is active for this build
export function hasEffect(effectName: string): boolean {
  return siteConfig.design.activeEffects?.includes(effectName) ?? false;
}

// Helper: get the variant for a section component
export function getVariant(section: keyof SiteConfig["design"]["components"]): string {
  const comp = siteConfig.design.components[section];
  return typeof comp === "object" ? comp.variant : "default";
}

// Helper: check if current color strategy matches
export function isColorStrategy(strategy: string): boolean {
  return siteConfig.design.colorStrategy === strategy;
}
