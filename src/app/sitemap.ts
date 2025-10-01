// src/app/sitemap.ts
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clickshift.io'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/risk-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
  url: `${baseUrl}/blog`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.9,
},
{
  url: `${baseUrl}/blog/how-to-avoid-liquidation-futures`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/blog/whale-tracking-guide-2025`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/blog/best-defi-trading-tools`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/blog/rsi-signals-crypto-trading`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/blog/solana-meme-coins-intelligence`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
  ]
}