import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

const blogContent = {
    "importing-batik-sarees": `
# How to Import Batik Sarees from India to Sri Lanka

The Sri Lankan boutique market thrives on premium, culturally resonant textiles. Indian Batik, specifically from the artisanal hubs of Jaipur, represents a gold standard for these requirements.

## 1. Quality Sourcing
The key to a successful import pipeline is bypassing middlemen and dealing directly with manufacturers. Look for suppliers who can guarantee **authentic wax-resist dyeing** rather than cheap digital prints.

## 2. Fabric Weight & Climate
Sri Lanka's tropical climate demands breathable fabrics. Demand *Mulmul Cotton* (also known as muslin) or lightweight *Cambric*. These fabrics drape elegantly while ensuring the wearer remains comfortable in high humidity.

## 3. Customs and Duties
Ensure your supplier provides proper documentation. A Certificate of Origin (COO) and accurate HS codes for cotton textiles (typically under Chapter 52) will expedite customs clearance in Colombo.

## 4. Sampling Protocol
Never place a full bulk order blindly. Request a "Feel Box" containing swatches of the actual yardage and at least one finished saree to verify color fastness and thread integrity.

*Shoolin Textiles specializes in end-to-end export logistics tailored specifically for Sri Lankan boutiques.*
  `,
    "best-fabrics-for-batik": `
# Best Fabrics for Sri Lankan Batik Boutiques

Batik is a demanding art form. The fabric must be porous enough to absorb wax securely, yet refined enough to accept vibrant dyes without bleeding. 

## The Undisputed King: Mulmul Cotton
Mulmul is the quintessential fabric for tropical fashion. Its sheer, buttery texture breathes exceptionally well. When treated with Batik, it requires careful temperature control of the wax, resulting in incredibly delicate crackle patterns.

## Rayon & Viscose
For boutiques looking to offer evening wear, Rayon provides an exceptional drape. It behaves similarly to silk but remains affordable for the commercial market. 

## Cambric Cotton
Cambric is slightly denser than Mulmul. It is the workhorse of the textile industry—perfect for structured garments, kurtis, and heavier sarees that require durability without compromising on the authentic Batik aesthetic.
  `,
    "jaipur-vs-sri-lankan-batik": `
# Jaipur Batik vs. Sri Lankan Batik: Differences & Benefits

While both regions share a colonial and trade-linked history with the art of Batik, their stylistic execution diverges beautifully.

## The Sri Lankan Aesthetic
Sri Lankan Batik is renowned for its large, sweeping motifs—frequently utilizing elephants, tropical flora, and high-contrast, vibrant color blocking. It is highly expressive and often treated as individual canvas art.

## The Jaipur Precision
Jaipur (Indian) Batik focuses deeply on geometric precision, block-print hybrid techniques, and intricate crackle-effects. The color palettes tend to feature deeper, earthier tones derived from traditional pigment recipes.

## The Hybrid Approach
The most successful modern boutiques merge these two worlds: sourcing the meticulous, fine-crackle Jaipur cotton fabrics, but custom-ordering colorways that appeal to the bright, coastal aesthetic of the Sri Lankan consumer.
  `,
    "wholesale-pricing-guide": `
# Wholesale Pricing Guide for Batik Sarees

Navigating the wholesale textile market requires an understanding of what authenticates the price tag of a Batik garment.

## 1. Handcrafted vs. Machine Assisted
True handcrafted Batik—where wax is applied via *tjanting* tools or hand-carved wooden blocks—carries a premium. The labor hours directly correlate to the price. 

## 2. Fabric Base Costs
A saree on raw silk or 100-count premium Mulmul will inherently cost 30-40% more than a standard 60-count cambric base. 

## 3. The Volume Discount Array (MOQs)
Most genuine manufacturers work on Tiered MOQs (Minimum Order Quantities).
- **Tier 1 (Boutique):** 20-50 pieces. Standard wholesale pricing.
- **Tier 2 (Commercial):** 50-200 pieces. Approx. 15% discount off base wholesale.
- **Tier 3 (Industrial):** 200+ pieces. Maximum margin retention for the buyer.

Always negotiate based on sustained volume over a fiscal year rather than a single massive shipment.
  `
};

const blogMetadata = {
    "importing-batik-sarees": { title: "How to import batik sarees from India to Sri Lanka", date: "Oct 12, 2025", author: "Exhibitions Team" },
    "best-fabrics-for-batik": { title: "Best fabrics for Sri Lankan batik boutiques", date: "Nov 04, 2025", author: "Material Science Division" },
    "jaipur-vs-sri-lankan-batik": { title: "Jaipur batik vs. Sri Lankan batik – differences & benefits", date: "Nov 18, 2025", author: "Cultural Archivist" },
    "wholesale-pricing-guide": { title: "Wholesale pricing guide for batik sarees", date: "Dec 01, 2025", author: "Logistics Team" }
};

const BlogPost = () => {
    const { slug } = useParams();
    const content = blogContent[slug];
    const meta = blogMetadata[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!content) {
        return (
            <div className="min-h-screen bg-background text-textdark flex items-center justify-center flex-col">
                <h1 className="font-drama text-5xl mb-4">Archive Not Found</h1>
                <Link to="/" className="font-mono hover:text-accent flex items-center gap-2"><ArrowLeft size={16} /> Return to Hub</Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen selection:bg-accent selection:text-white">
            {/* MINIMAL NAVBAR */}
            <div className="w-full py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center border-b border-black/5 bg-white">
                <div className="font-sans font-bold tracking-tight text-xl uppercase text-primary">SHOOLIN</div>
                <Link to="/" className="font-mono text-sm flex items-center gap-2 hover:text-accent transition-colors"><ArrowLeft size={16} /> Back to Main Site</Link>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-24">
                <header className="mb-16">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 flex gap-4">
                        <span>{meta.date}</span>
                        <span>//</span>
                        <span>{meta.author}</span>
                    </div>
                    <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-8">
                        {meta.title}
                    </h1>
                </header>

                <div
                    className="prose prose-lg prose-slate max-w-none font-serif text-textdark/80 
                     prose-headings:font-sans prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight
                     prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12
                     prose-a:text-accent prose-a:no-underline hover:prose-a:text-primary
                     prose-strong:text-primary"
                    dangerouslySetInnerHTML={{ __html: marked(content) }}
                />

                <div className="mt-24 pt-12 border-t border-black/10">
                    <Link to="/" className="magnetic-btn bg-primary text-white px-8 py-4 rounded-pill font-sans font-semibold tracking-wide flex items-center gap-3 w-max">
                        <ArrowLeft size={18} /> Return to Home
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
