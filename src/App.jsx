import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Leaf, Sparkles, Fingerprint, ChevronLeft, ChevronRight, Grid, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const navbarRef = useRef(null);
    const philosophyRef = useRef(null);
    const philosophyParallaxRef = useRef(null);
    const protocolWrapperRef = useRef(null);
    const catalogScrollRef = useRef(null);

    const [scrolled, setScrolled] = useState(false);
    const [typingText, setTypingText] = useState("");

    const metrics = [
        "Fabric: Premium Mulmul",
        "Origin: Jaipur, India",
        "Export Status: Live",
        "Availability: Wholesale",
    ];

    const baseImages = [
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16.jpg", name: "Floral Heritage", category: "Mulmul Cotton Batik Saree" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 5.jpg", name: "Geometric Elegance", category: "Traditional Batik Saree" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 6.jpg", name: "Modern Batik", category: "Designer Batik Fabric" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 7.jpg", name: "Cotton Dreams", category: "Mulmul Cotton Batik" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 8.jpg", name: "Artisan Collection", category: "Handcrafted Batik Saree" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 9.jpg", name: "Vibrant Traditions", category: "Batik Fabric" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 10.jpg", name: "Royal Batik", category: "Premium Batik Saree" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 11.jpg", name: "Summer Breeze", category: "Lightweight Mulmul Batik" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 12.jpg", name: "Feather Light", category: "Lightweight Mulmul" },
        { src: "catalog-image/PHOTO-2025-12-07-11-21-16 13.jpg", name: "Traditional Art", category: "Classic Batik Design" },
    ];

    const catalogImages = [
        ...baseImages,
        ...baseImages.map(img => ({ ...img, name: img.name + " II", category: "Exclusive " + img.category })),
        ...baseImages.map(img => ({ ...img, name: img.name + " III", category: "Premium " + img.category })),
    ];

    const blogPosts = [
        { slug: "importing-batik-sarees", title: "How to import batik sarees from India to Sri Lanka", img: catalogImages[4].src },
        { slug: "best-fabrics-for-batik", title: "Best fabrics for Sri Lankan batik boutiques", img: catalogImages[5].src },
        { slug: "jaipur-vs-sri-lankan-batik", title: "Jaipur batik vs. Sri Lankan batik – differences & benefits", img: catalogImages[6].src },
        { slug: "wholesale-pricing-guide", title: "Wholesale pricing guide for batik sarees", img: catalogImages[7].src },
    ];

    // Typing effect
    useEffect(() => {
        let currentLine = 0;
        let currentChar = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            const fullString = metrics[currentLine];

            setTypingText(fullString.substring(0, currentChar));

            if (!isDeleting && currentChar === fullString.length) {
                timeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentLine = (currentLine + 1) % metrics.length;
                timeout = setTimeout(type, 500);
            } else {
                currentChar += isDeleting ? -1 : 1;
                timeout = setTimeout(type, isDeleting ? 30 : 50);
            }
        };

        timeout = setTimeout(type, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar scroll listener removed as header is now solid white

            // Hero Entrance Animation
            const heroTexts = gsap.utils.toArray('.hero-anim');
            gsap.fromTo(heroTexts,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
            );

            // Philosophy Parallax & Text Reveal
            gsap.to(philosophyParallaxRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: philosophyRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            const philTexts = gsap.utils.toArray('.phil-anim');
            gsap.fromTo(philTexts,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: philosophyRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Protocol Stacking Archive
            const cards = gsap.utils.toArray('.protocol-card');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: protocolWrapperRef.current,
                    pin: true,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    scrub: 1,
                }
            });

            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.to(card, {
                    yPercent: -100,
                    ease: "none"
                });
            });

        });

        return () => ctx.revert();
    }, [scrolled]);

    const scrollCatalog = (direction) => {
        if (catalogScrollRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            catalogScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        let isHovered = false;
        let animationFrameId;
        const scrollElement = catalogScrollRef.current;
        let currentScrollPos = 0;

        const scroll = () => {
            if (scrollElement && !isHovered) {
                currentScrollPos += 0.8;
                if (currentScrollPos >= scrollElement.scrollWidth - scrollElement.clientWidth - 1) {
                    currentScrollPos = 0;
                }
                scrollElement.scrollLeft = currentScrollPos;
            } else if (scrollElement && isHovered) {
                currentScrollPos = scrollElement.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        if (scrollElement) {
            scrollElement.addEventListener('mouseenter', () => isHovered = true);
            scrollElement.addEventListener('mouseleave', () => isHovered = false);
            scrollElement.addEventListener('touchstart', () => isHovered = true);
            scrollElement.addEventListener('touchend', () => isHovered = false);
            setTimeout(() => {
                currentScrollPos = scrollElement.scrollLeft;
                animationFrameId = requestAnimationFrame(scroll);
            }, 1000);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full relative selection:bg-accent selection:text-primary">
            {/* NAVBAR */}
            <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none bg-white shadow-sm">
                <nav ref={navbarRef} className="pointer-events-auto flex items-center justify-between w-full max-w-[90rem] px-6 md:px-12 lg:px-24 py-4 text-[#0D0D12] transition-colors duration-300">
                    <div className="nav-logo font-sans font-bold tracking-tight text-xl transition-colors duration-300">Shoolin Textiles</div>
                    <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase translate-y-[1px]">
                        <button onClick={() => scrollToSection('collections')} className="nav-link text-[#0D0D12] hover-lift transition-colors hover:text-accent">Collections</button>
                        <button onClick={() => scrollToSection('full-catalog')} className="nav-link text-[#0D0D12] hover-lift transition-colors hover:text-accent">Catalog</button>
                        <button onClick={() => scrollToSection('blogs')} className="nav-link text-[#0D0D12] hover-lift transition-colors hover:text-accent">Journal</button>
                        <button onClick={() => scrollToSection('about')} className="nav-link text-[#0D0D12] hover-lift transition-colors hover:text-accent">About</button>
                    </div>
                    <a href="https://wa.me/919166800714" target="_blank" rel="noreferrer" className="magnetic-btn bg-accent text-primary px-5 py-2 rounded-pill font-sans font-semibold text-sm tracking-wide shadow-md">
                        <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">Wholesale Inquiry <ArrowRight size={14} /></span>
                        <span className="absolute inset-0 bg-[#D4B55E] -z-10 translate-y-full transition-transform duration-300"></span>
                    </a>
                </nav>
            </div>

            {/* HERO SECTION */}
            <section ref={heroRef} className="relative w-full h-[100dvh] flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden rounded-b-3rem bg-primary">
                <div className="absolute inset-0 z-0">
                    <img src={`${import.meta.env.BASE_URL}hero-image/PHOTO-2025-09-04-15-30-37.jpg`} alt="Model wearing premium Indian Batik Saree" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/20"></div>
                </div>

                <div ref={heroTextRef} className="relative z-10 w-full max-w-5xl text-[#FAF8F5]">
                    <h1 className="flex flex-col gap-2">
                        <span className="hero-anim block font-sans font-extrabold text-4xl md:text-5xl lg:text-7xl tracking-tighter uppercase">
                            Handcrafted
                        </span>
                        <span className="hero-anim block font-drama italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] text-accent pr-8 -ml-2">
                            Excellence.
                        </span>
                    </h1>
                    <div className="hero-anim mt-10 md:mt-16 flex flex-col items-start gap-6">
                        <p className="font-mono text-sm md:text-base max-w-md opacity-80 leading-relaxed">
                            Premium Indian Batik Sarees & Mulmul Cotton. Blending centuries-old artisanal mastery with modern luxury expectations.
                        </p>
                        <button onClick={() => scrollToSection('full-catalog')} className="magnetic-btn bg-[#FAF8F5] text-primary px-8 py-4 rounded-pill font-sans font-semibold tracking-wide flex items-center gap-3 shadow-lg">
                            <span className="relative z-10 flex items-center gap-2">Explore Catalog</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* COLLECTIONS / FEATURES SECTION */}
            <section id="collections" className="py-32 px-6 md:px-12 lg:px-24 bg-background z-10 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card 1: Varieties */}
                    <div className="bg-white rounded-3rem p-8 md:p-12 shadow-sm border border-black/5 relative overflow-hidden group min-h-[400px] flex flex-col justify-between">
                        <div className="flex items-center gap-3 text-primary mb-12">
                            <Sparkles size={24} />
                            <span className="font-mono text-xs uppercase font-semibold tracking-wider">Premium Collections</span>
                        </div>
                        <div className="relative h-40">
                            <div className="absolute top-0 left-0 w-full bg-background rounded-2xl p-6 shadow-sm transform transition-all duration-500 hover:-translate-y-2 z-30 border border-black/5">
                                <p className="font-sans font-semibold text-lg">Classic Batik Sarees</p>
                                <p className="font-mono text-xs mt-2 opacity-60">Traditional motifs & vibrant hues</p>
                            </div>
                            <div className="absolute top-4 left-4 w-full bg-primary text-white rounded-2xl p-6 shadow-sm transform transition-all duration-500 group-hover:-translate-y-4 group-hover:-translate-x-2 z-20 border border-white/10 scale-95 opacity-80">
                                <p className="font-sans font-semibold text-lg">Mulmul Cotton</p>
                                <p className="font-mono text-xs mt-2 opacity-80">Soft, airy, tropical comfort</p>
                            </div>
                            <div className="absolute top-8 left-8 w-full bg-textdark text-white rounded-2xl p-6 shadow-sm transform transition-all duration-500 group-hover:-translate-y-6 group-hover:-translate-x-4 z-10 scale-90 opacity-60">
                                <p className="font-sans font-semibold text-lg">Contemporary Array</p>
                                <p className="font-mono text-xs mt-2 opacity-80">Modern interpretations & bold design</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Telemetry/Specs */}
                    <div className="bg-primary text-background rounded-3rem p-8 md:p-12 relative overflow-hidden group min-h-[400px] flex flex-col justify-between">
                        <div className="flex items-center gap-3 text-accent mb-12 opacity-80">
                            <Fingerprint size={24} />
                            <span className="font-mono text-xs uppercase font-semibold tracking-wider">Fabric Specifications</span>
                        </div>

                        <div className="font-mono text-sm md:text-base leading-relaxed bg-textdark/40 p-6 rounded-2xl border border-white/5 h-40 flex items-start">
                            <span>{`> `}<span className="text-accent">{typingText}</span><span className="animate-pulse">_</span></span>
                        </div>
                    </div>

                    {/* Card 3: Logistics */}
                    <div className="bg-white rounded-3rem p-8 md:p-12 shadow-sm border border-black/5 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
                        <div className="flex items-center gap-3 text-primary mb-8">
                            <Leaf size={24} />
                            <span className="font-mono text-xs uppercase font-semibold tracking-wider">Export Protocol</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 h-40">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className={`rounded-lg transition-colors duration-1000 ${i === 5 || i === 6 || i === 10 ? 'bg-accent' : 'bg-background hover:bg-primary/10'}`}></div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* CATALOG CAROUSEL SECTION */}
            <section id="catalog-carousel" className="py-16 bg-background z-10 relative overflow-hidden border-t border-black/5">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter text-primary">Featured Selection</h2>
                        <p className="font-mono text-sm opacity-60 mt-4 max-w-md">Hover or drag horizontally to explore curated highlights from our handcrafted designs.</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <button onClick={() => scrollCatalog('left')} className="magnetic-btn w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scrollCatalog('right')} className="magnetic-btn w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={catalogScrollRef}
                    className="flex gap-4 overflow-x-auto pb-12 px-6 md:px-12 lg:px-24 cursor-grab active:cursor-grabbing overscroll-x-contain"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {catalogImages.slice(0, 10).map((img, idx) => (
                        <div key={idx} className="flex-shrink-0 group cursor-pointer hover-lift">
                            <div className="h-[45vh] aspect-[3/4] rounded-2rem overflow-hidden bg-textdark/5 relative mb-4 shadow-sm">
                                <img src={`${import.meta.env.BASE_URL}${img.src}`} alt={img.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" draggable="false" />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="font-drama text-lg md:text-xl mb-1 text-primary">{img.name}</h3>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-accent">{img.category}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FULL CATALOG GRID SECTION */}
            <section id="full-catalog" className="py-24 bg-white relative z-10 border-t border-black/5 rounded-t-3rem mt-[-2rem]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 text-primary mb-4">
                                <Grid size={24} />
                                <span className="font-mono text-xs uppercase font-semibold tracking-wider">Archive</span>
                            </div>
                            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter text-primary">Catalog</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {catalogImages.map((img, idx) => (
                            <div key={idx} className="group cursor-pointer hover-lift">
                                <div className="w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-textdark/5 relative mb-4 shadow-sm border border-black/5">
                                    <img src={`${import.meta.env.BASE_URL}${img.src}`} alt={img.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <h3 className="font-drama text-lg md:text-xl mb-1 text-textdark group-hover:text-accent transition-colors">{img.name}</h3>
                                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-textdark/50">{img.category}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* PHILOSOPHY SECTION */}
            <section id="about" ref={philosophyRef} className="relative py-48 w-full bg-primary text-background overflow-hidden rounded-3rem mb-[-3rem] pb-[10rem] z-20 shadow-2xl">
                <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
                    <img ref={philosophyParallaxRef} src={`${import.meta.env.BASE_URL}hero-image/PHOTO-2025-09-04-15-30-37.jpg`} alt="Abstract fibers" className="w-full h-[130%] object-cover object-center -top-[15%] filter grayscale blur-sm" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <p className="phil-anim font-mono text-sm uppercase tracking-widest opacity-60 mb-8 w-full block">The Manifesto</p>
                    <div className="flex flex-col gap-4 items-center">
                        <h2 className="phil-anim font-sans font-bold text-3xl md:text-4xl tracking-tight text-[#FAF8F5] opacity-90">
                            Jaipur Craftsmanship.
                        </h2>
                        <h2 className="phil-anim font-drama italic text-5xl md:text-7xl lg:text-[6rem] mt-2 leading-none text-[#FAF8F5]">
                            Sri Lanka <span className="text-accent">Focused.</span>
                        </h2>
                        <p className="phil-anim mt-6 font-sans text-base md:text-lg max-w-2xl text-[#FAF8F5] opacity-80 leading-relaxed font-light">
                            We are a trusted wholesale manufacturer supplying premium Sri Lankan-style batik sarees and fabrics. Blending India’s textile heritage with Sri Lanka’s fashion preferences, we support your business growth with consistent quality, custom designs, and reliable exports.
                        </p>
                    </div>
                </div>
            </section>

            {/* PROTOCOL (Stacking Archive) */}
            <section id="protocol" ref={protocolWrapperRef} className="h-screen w-full relative overflow-hidden bg-background">
                {/* Card 1 */}
                <div className="protocol-card absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center p-6 bg-background pt-[3rem]">
                    <div className="w-full max-w-5xl h-[80%] rounded-3rem bg-white border border-black/5 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 group">
                        <div className="flex-1">
                            <div className="font-mono text-sm text-accent mb-6">01 // Quality Fabrics</div>
                            <h3 className="font-sans font-bold text-4xl md:text-5xl mb-6 tracking-tight text-primary">Premium Materials</h3>
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-70 text-textdark">We supply top-grade mul mul, cambric, poplin, and rayon tailored for tropical climates. Best quality colors, fasteners, and binders are used in the process, and every fabric undergoes strict quality checks for softness, colour fastness, and print clarity.</p>
                        </div>
                        <div className="flex-1 w-full bg-background rounded-2xl h-full relative overflow-hidden flex items-center justify-center border border-black/5">
                            <img src={`${import.meta.env.BASE_URL}catalog-image/PHOTO-2025-12-07-11-21-16 13.jpg`} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="protocol-card absolute z-20 top-0 left-0 w-full h-full translate-y-full flex items-center justify-center p-6 bg-background pt-[3rem]">
                    <div className="w-full max-w-5xl h-[80%] rounded-3rem bg-primary text-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 w-full bg-gradient-to-br from-textdark to-primary rounded-2xl h-full relative overflow-hidden flex items-center justify-center border border-white/10 group shadow-inner">
                            <img src={`${import.meta.env.BASE_URL}catalog-image/PHOTO-2025-12-07-11-21-16.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" />
                            <div className="w-full h-full relative z-10 mix-blend-overlay">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-accent z-10 animate-[bounce_3s_infinite]"></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="font-mono text-sm text-accent mb-6">02 // Design & Customization</div>
                            <h3 className="font-sans font-bold text-4xl md:text-5xl mb-6 tracking-tight text-[#FAF8F5]">Curated Batik</h3>
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 text-[#FAF8F5]">Authentic handmade and machine-printed batiks matching Sri Lanka's vibrant trends. We offer personalized designs, custom colour palettes, and exclusive boutique collections at scale.</p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="protocol-card absolute z-30 top-0 left-0 w-full h-full translate-y-full flex items-center justify-center p-6 bg-background pt-[3rem]">
                    <div className="w-full max-w-5xl h-[80%] rounded-3rem bg-textdark text-white border border-white/5 shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="font-mono text-sm text-accent mb-6">03 // Reliable Wholesale</div>
                            <h3 className="font-sans font-bold text-4xl md:text-5xl mb-6 tracking-tight text-[#FAF8F5]">Trusted Export</h3>
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 text-[#FAF8F5]">End-to-end secure shipping from India to Sri Lanka. Enjoy wholesale-friendly pricing, flexible MOQs, and instant WhatsApp support tailored for reliable business growth.</p>
                        </div>
                        <div className="flex-1 w-full bg-[#111111] rounded-2xl h-full relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
                            <div className="w-full flex items-center justify-center gap-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-1 bg-accent rounded-full animate-pulse transition-all duration-${300 * i} opacity-${100 - (i * 10)} h-${10 + i * 4}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="protocol-card absolute z-40 top-0 left-0 w-full h-full translate-y-full flex items-center justify-center p-6 bg-background pt-[3rem]">
                    <div className="w-full max-w-5xl h-[80%] rounded-3rem bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 group border border-black/5">
                        <div className="flex-1 w-full bg-background rounded-2xl h-full relative overflow-hidden flex items-center justify-center shadow-inner group-hover:shadow-2xl transition-shadow duration-500">
                            <img src={`${import.meta.env.BASE_URL}catalog-image/sri-lankandrape.jpeg`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                        <div className="flex-1">
                            <div className="font-mono text-sm text-accent mb-6">04 // Wider Width</div>
                            <h3 className="font-sans font-bold text-4xl md:text-5xl mb-6 tracking-tight text-primary">Sri Lankan Drape</h3>
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 text-textdark">Our sarees feature a longer and wider cut than typical Indian batiks. These generous dimensions are meticulously crafted to perfectly accommodate the traditional and graceful Sri Lankan draping style.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOGS SECTION */}
            <section id="blogs" className="py-32 bg-background z-10 relative mt-12 mb-12 border-t border-black/5 rounded-t-3rem">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-tighter text-primary">Journal & Insights</h2>
                        <span className="hidden md:flex items-center gap-2 font-mono text-sm uppercase hover:text-accent transition-colors text-textdark">See all <ArrowRight size={14} /></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {blogPosts.map((blog, i) => (
                            <Link to={`/blog/${blog.slug}`} key={i} className="group block cursor-pointer hover-lift">
                                <div className="w-full aspect-[4/3] rounded-2rem overflow-hidden bg-textdark/5 relative mb-6 shadow-sm border border-black/5">
                                    <img src={`${import.meta.env.BASE_URL}${blog.img}`} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                                </div>
                                <h3 className="font-drama text-xl md:text-2xl mb-3 text-textdark leading-snug group-hover:text-accent transition-colors">{blog.title}</h3>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-textdark/50 group-hover:text-accent transition-colors flex items-center gap-1">Read article <ArrowRight size={10} /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-primary text-background pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem] relative mt-[-2rem] z-30 overflow-hidden shadow-2xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">

                    <div className="flex flex-col gap-6">
                        <h2 className="font-sans font-extrabold text-5xl md:text-7xl uppercase tracking-tighter text-accent">
                            Shoolin Textiles.
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="font-mono text-xs uppercase tracking-wider opacity-60">System Operational - Jaipur Export Active</span>
                        </div>
                    </div>

                    <div className="flex gap-12 font-mono text-sm opacity-60">
                        <div className="flex flex-col gap-2">
                            <button onClick={() => scrollToSection('collections')} className="hover:text-accent transition-colors text-left text-base">Collections</button>
                            <button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors text-left text-base">Manifesto</button>
                            <button onClick={() => scrollToSection('full-catalog')} className="hover:text-accent transition-colors text-left text-base">Catalog</button>
                            <button onClick={() => scrollToSection('blogs')} className="hover:text-accent transition-colors text-left text-base">Journal</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="mailto:shoolintextiles@gmail.com" className="hover:text-accent transition-colors text-base">Email Us</a>
                            <a href="tel:+919166800714" className="hover:text-accent transition-colors text-base">Call Direct</a>
                            <a href="https://wa.me/919166800714" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors text-base">
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center font-mono text-xs opacity-50 relative z-10">
                    <span>© {new Date().getFullYear()} Shoolin Textiles. Jaipur, India.</span>
                    <span>Premium Indian Batik</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
