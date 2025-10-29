"use client";
import React from 'react';
import Link from "next/link";
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2,
  BookmarkPlus,
  TrendingUp,
  Shield,
  Target,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';


import { blogContent } from './blog-content';

/* ✅ Named export for the Share + Bookmark buttons */
export function ShareAndBookmark({
  title,
  slug,
  category,
}: {
  title: string;
  slug: string;
  category: string;
}) {
  const fullUrl = `https://www.clickshift.io/blog/${slug}`;

  const handleShare = async () => {
    const shareData = {
      title: `${title} | ClickShift Blog`,
      text: `As the world migrates to Web3, stay ahead of the pack with ${category.toLowerCase()} insights from ClickShift. Read below 👇`,
      url: fullUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(fullUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    alert("Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark this page.");
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleShare}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
        aria-label="Share article"
      >
        <Share2 className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={handleBookmark}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
        aria-label="Bookmark article"
      >
        <BookmarkPlus className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}



export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug];

  if (!post) {
    notFound();
  }

  const relatedPosts = Object.entries(blogContent)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 3)
    .map(([slug, content]) => ({ slug, ...content }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <article className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-sm font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center space-x-2 text-slate-400 text-sm">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-slate-400 text-sm">{post.date}</span>
            <span className="text-slate-400 text-sm">{post.views} views</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{post.author[0]}</span>
              </div>
              <div>
                <div className="font-semibold">{post.author}</div>
                <div className="text-sm text-slate-400">{post.role}</div>
              </div>
            </div>

            
            {/* ✅ Drop-in functional buttons here */}
         <ShareAndBookmark title={post.title} slug={params.slug} category={post.category} />

          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Trade with Intelligence?
            </h3>
            <p className="text-slate-300 mb-6">
              Join 525+ traders using ClickShift's AI-powered intelligence to make smarter trading decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://alpha.clickshift.io"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <span>Try Alpha Free</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://leverage.clickshift.io"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
              >
                <span>Try Leverage Free</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700 cursor-pointer transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 px-4 bg-slate-800/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${relatedPost.gradient}`}></div>
                
                <div className="p-6">
                  <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                    {relatedPost.category}
                  </span>

                  <h3 className="text-lg font-bold mt-4 mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{relatedPost.readTime}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}