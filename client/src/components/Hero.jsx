import { Link } from "react-router-dom";
import { HiOutlinePhotograph, HiOutlineVideoCamera } from "react-icons/hi";

export default function Hero() {
    return (
        <section className="relative pt-40 pb-28 px-6 lg:px-10 overflow-hidden">
            {/* ambient grid backdrop */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "linear-gradient(#223140 1px, transparent 1px), linear-gradient(90deg, #223140 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
                }}
            />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Copy */}
                <div className="animate-fadeUp">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-scan bg-surface border border-edge px-3 py-1 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-scan animate-pulseGlow" />
                        REAL-TIME MEDIA FORENSICS
                    </span>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-fog tracking-tight">
                        Know what's real
                        <br />
                        before it spreads.
                    </h1>

                    <p className="mt-6 text-lg text-mist max-w-lg leading-relaxed">
                        DeepGuard AI analyzes images and video frame-by-frame to detect
                        AI-generated manipulation, giving you a confidence score you can
                        act on in seconds.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Link
                            to="/upload/image"
                            className="inline-flex items-center gap-2 text-sm font-medium text-ink bg-scan px-5 py-3 rounded-lg hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,229,199,0.4)] transition-all duration-200"
                        >
                            <HiOutlinePhotograph className="text-base" />
                            Upload Image
                        </Link>
                        <Link
                            to="/upload/video"
                            className="inline-flex items-center gap-2 text-sm font-medium text-fog bg-surface border border-edge px-5 py-3 rounded-lg hover:border-scan/50 hover:bg-surface2 transition-all duration-200"
                        >
                            <HiOutlineVideoCamera className="text-base" />
                            Upload Video
                        </Link>
                        <a
                            href="#features"
                            className="text-sm text-mist hover:text-fog underline underline-offset-4 decoration-edge hover:decoration-scan transition-colors px-2 py-3"
                        >
                            Learn more
                        </a>
                    </div>
                </div>

                {/* Viewfinder visual — signature element */}
                <div className="relative mx-auto w-full max-w-md aspect-square animate-fadeUp [animation-delay:150ms]">
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-surface to-surface2 border border-edge overflow-hidden">
                        {/* corner brackets */}
                        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
                            (pos, i) => (
                                <span
                                    key={i}
                                    className={`absolute w-6 h-6 border-scan/70 ${pos}`}
                                />
                            )
                        )}

                        {/* abstract face-mesh placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-scan/20 to-transparent blur-2xl" />
                            <svg viewBox="0 0 200 200" className="absolute w-48 h-48 opacity-70">
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#223140" strokeWidth="1" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="#00E5C7" strokeOpacity="0.3" strokeWidth="1" />
                                <circle cx="100" cy="100" r="30" fill="none" stroke="#223140" strokeWidth="1" />
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const angle = (i / 12) * Math.PI * 2;
                                    const x = 100 + Math.cos(angle) * 70;
                                    const y = 100 + Math.sin(angle) * 70;
                                    return <circle key={i} cx={x} cy={y} r="2" fill="#00E5C7" fillOpacity="0.5" />;
                                })}
                            </svg>
                        </div>

                        {/* animated scan line */}
                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-scan to-transparent animate-scanline shadow-[0_0_12px_2px_rgba(0,229,199,0.6)]" />

                        {/* readout label */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-mist bg-ink/60 backdrop-blur-sm border border-edge rounded-md px-3 py-2">
                            <span>ANALYZING…</span>
                            <span className="text-scan">98.6% CONFIDENCE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}