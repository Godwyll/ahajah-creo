import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }: PageProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <Head title="Welcome" />
            {/* Top-right auth links */}
            <div className="absolute top-0 right-0 p-6">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 ring-1 ring-inset ring-white/10"
                    >
                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z" /></svg>
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('login')}
                            className="font-semibold text-white/80 hover:text-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 shadow ring-1 ring-inset ring-indigo-400/30"
                        >
                            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z" /></svg>
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* Decorative background shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
                <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
                <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>
            </div>

            {/* Hero */}
            <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo style={{ width: 48, height: 48 }} />
                            <span className="text-2xl font-bold tracking-tight">TekWidget</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-inset ring-white/10 mt-4">
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            Deploy interactive content across any website
                        </div>
                        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">Engage. Collect. Understand.</span>
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-300/90 max-w-2xl">
                            Create tips and surveys, capture sessions and responses, and visualize engagement with in-depth analytics.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            {auth.user ? (
                                <>
                                    <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 ring-1 ring-inset ring-indigo-400/30">
                                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z" /></svg>
                                        Open Dashboard
                                    </Link>
                                    <Link href={route('contents.index')} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-inset ring-white/10">
                                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z" /></svg>
                                        Create Content
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('register')} className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600 ring-1 ring-inset ring-indigo-400/30">
                                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z" /></svg>
                                        Get Started Free
                                    </Link>
                                    <Link href={route('login')} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-inset ring-white/10">Sign In</Link>
                                </>
                            )}
                        </div>
                        <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Real-time sessions</span>
                            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span> Insightful analytics</span>
                            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400"></span> Designed for speed</span>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                            <div className="pointer-events-none absolute -inset-1 rounded-2xl ring-1 ring-inset ring-white/10" />
                            <div className="rounded-xl bg-slate-900/60 ring-1 ring-inset ring-white/10">
                                <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-slate-400">
                                    <span className="inline-flex gap-1"><span className="h-2 w-2 rounded-full bg-red-400"></span><span className="h-2 w-2 rounded-full bg-yellow-400"></span><span className="h-2 w-2 rounded-full bg-emerald-400"></span></span>
                                    <span className="truncate">analytics.ts</span>
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="col-span-2 rounded-lg bg-slate-800 p-3 ring-1 ring-inset ring-white/10">
                                            <div className="text-[10px] uppercase tracking-wide text-slate-400">Sessions</div>
                                            <div className="mt-1 h-16 flex items-end gap-1">
                                                {[3, 6, 4, 8, 7, 10, 9].map((v, i) => (
                                                    <div key={i} className="flex-1 rounded-t bg-indigo-400/80" style={{ height: `${(v / 10) * 100}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-2 rounded-lg bg-slate-800 p-3 ring-1 ring-inset ring-white/10">
                                            <div className="text-[10px] uppercase tracking-wide text-slate-400">Responses</div>
                                            <div className="mt-1 h-16 flex items-end gap-1">
                                                {[2, 4, 3, 5, 6, 7, 8].map((v, i) => (
                                                    <div key={i} className="flex-1 rounded-t bg-emerald-400/80" style={{ height: `${(v / 8) * 100}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-4 rounded-lg bg-slate-800 p-3 ring-1 ring-inset ring-white/10">
                                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                                                <span>Top content (sample)</span>
                                                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>Healthy Sleep Habits</span>
                                            </div>
                                            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                                                <div className="rounded-md bg-slate-700/70 px-2 py-1">Tip • 124 sessions</div>
                                                <div className="rounded-md bg-slate-700/70 px-2 py-1">Survey • 98 responses</div>
                                                <div className="rounded-md bg-slate-700/70 px-2 py-1">Conversion • 68%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature grid */}
            <section className="relative mx-auto max-w-7xl px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="group rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/20 text-indigo-200">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z" /></svg>
                        </div>
                        <div className="mt-3 text-slate-200 font-semibold">Content Builder</div>
                        <p className="text-sm text-slate-400">Create tips and surveys with flexible question types and options.</p>
                    </div>
                    <div className="group rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-200">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6H4V5Zm0 8h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z" /></svg>
                        </div>
                        <div className="mt-3 text-slate-200 font-semibold">Session Tracking</div>
                        <p className="text-sm text-slate-400">See where responses come from with IP, URL, and user agent.</p>
                    </div>
                    <div className="group rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/20 text-sky-200">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4a2 2 0 0 0-2 2v13l5-3 5 3 5-3 3 1.8V6a2 2 0 0 0-2-2H5Z" /></svg>
                        </div>
                        <div className="mt-3 text-slate-200 font-semibold">Response Analytics</div>
                        <p className="text-sm text-slate-400">Track daily activity and top-performing content at a glance.</p>
                    </div>
                    <div className="group rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/20 text-amber-200">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                        </div>
                        <div className="mt-3 text-slate-200 font-semibold">Intelligent Distribution</div>
                        <p className="text-sm text-slate-400">Intelligent popup timing and content selection based on user behavior.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative mx-auto max-w-7xl px-6 pb-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 ring-1 ring-inset ring-white/10">
                            <ApplicationLogo style={{ width: 16, height: 16 }} />
                        </span>
                        <span>TekWidget &copy; {new Date().getFullYear()} - All rights reserved</span> |
                        <span>Powered by <a href="https://uits.knust.edu.gh" target="_blank" className="text-indigo-400 hover:text-indigo-300">University Information Technology Services</a></span>
                    </div>
                </div>
            </footer>
        </div>
        );
	}
