import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        Made by Messer
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Quality woodworking projects with custom laser engraving.
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  coverImage,
  slug,
}: {
  title: string;
  coverImage: any;
  excerpt: string;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-4 md:mb-8">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-xl md:text-2xl lg:text-3xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(true);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  console.log(allPosts);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
