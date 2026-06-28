import { BlogFrontmatter, BlogPost, BlogPostPreview } from '@/types/blog';
import {
  getDocumentBySlug,
  getDocumentSlugs,
  getDocuments,
} from 'outstatic/server';

const COLLECTION = 'posts';

// Fields to request from Outstatic
const LISTING_FIELDS = [
  'slug',
  'title',
  'description',
  'coverImage',
  'tags',
  'publishedAt',
];
const FULL_FIELDS = [...LISTING_FIELDS, 'content', 'status'];

/**
 * Normalise Outstatic tags (array of { label, value } objects) to string[]
 */
function normaliseTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((tag) => {
      if (typeof tag === 'string') return tag;
      if (tag && typeof tag === 'object') {
        const obj = tag as { label?: string; value?: string };
        return obj.value ?? obj.label ?? '';
      }
      return '';
    })
    .filter((tag): tag is string => tag.length > 0);
}

/**
 * Map an Outstatic document to the existing BlogFrontmatter shape
 */
function mapToFrontmatter(doc: Record<string, unknown>): BlogFrontmatter {
  return {
    title: (doc.title as string) ?? '',
    description: (doc.description as string) ?? '',
    image: (doc.coverImage as string) ?? '',
    tags: normaliseTags(doc.tags),
    date: (doc.publishedAt as string) ?? '',
    isPublished: doc.status === 'published',
  };
}

/**
 * Get all blog post slugs (including drafts — for generateStaticParams)
 */
export function getBlogPostSlugs(): string[] {
  return getDocumentSlugs(COLLECTION);
}

/**
 * Get blog post by slug with full content.
 * Returns null for draft posts.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const doc = getDocumentBySlug(COLLECTION, slug, FULL_FIELDS);

  if (!doc) return null;

  return {
    slug,
    frontmatter: mapToFrontmatter(doc),
    content: (doc.content as string) ?? '',
  };
}

/**
 * Get all published blog posts (for listing page).
 * Outstatic's getDocuments already filters to published and sorts by date desc.
 */
export function getPublishedBlogPosts(): BlogPostPreview[] {
  const docs = getDocuments(COLLECTION, LISTING_FIELDS);

  return docs.map((doc) => ({
    slug: doc.slug as string,
    frontmatter: mapToFrontmatter(doc),
  }));
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPostPreview[] {
  return getPublishedBlogPosts().filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
    ),
  );
}

/**
 * Get all unique tags from published posts
 */
export function getAllTags(): string[] {
  const publishedPosts = getPublishedBlogPosts();
  const tagsSet = new Set<string>();

  publishedPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagsSet.add(tag.toLowerCase());
    });
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get related posts based on tags (excluding the current post)
 */
export function getRelatedPosts(
  currentSlug: string,
  maxPosts = 3,
): BlogPostPreview[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost || !currentPost.frontmatter.isPublished) {
    return [];
  }

  const allPosts = getPublishedBlogPosts();
  const currentTags = currentPost.frontmatter.tags.map((tag) =>
    tag.toLowerCase(),
  );

  // Calculate relevance score based on shared tags
  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.frontmatter.tags.filter((tag) =>
        currentTags.includes(tag.toLowerCase()),
      );
      return {
        post,
        score: sharedTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, maxPosts).map((item) => item.post);
}
