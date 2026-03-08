import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(_context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const data = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.slug,
  }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
