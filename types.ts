export interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string; // Lucide icon lookup name
  glowColor: "cyan" | "purple" | "pink" | "blue";
  stats: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric: string;
  metricLabel: string;
}

export interface RoadmapMilestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: "completed" | "active" | "planned";
  phase: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSeed: string; // Used to fetch/generate procedural images or nice placeholders
  link: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatarSeed: string;
  comment: string;
  rating: number;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  subLabel: string;
  color: string;
}
