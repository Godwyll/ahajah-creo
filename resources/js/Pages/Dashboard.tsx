import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Content } from '@/types';

type DashboardStats = {
	contents: number;
	tips: number;
	surveys: number;
	sessions: number;
	responses: number;
};

type SeriesPoint = { date: string; count: number };

// Minimal shape from backend for top lists
type TopContent = Pick<Content, 'id' | 'title' | 'type'> & {
	sessions_count?: number;
	responses_count?: number;
};

type DashboardProps = PageProps & {
	stats?: DashboardStats;
	analytics?: {
		sessionsByDay: SeriesPoint[];
		responsesByDay: SeriesPoint[];
	};
	top?: {
		bySessions: TopContent[];
		byResponses: TopContent[];
	};
};

export default function Dashboard({ auth, stats, analytics, top }: DashboardProps) {
	const s = stats ?? { contents: 0, tips: 0, surveys: 0, sessions: 0, responses: 0 };
	const a = analytics ?? { sessionsByDay: [], responsesByDay: [] };
	const t = top ?? { bySessions: [], byResponses: [] };

	const Chart = ({ title, series, accent }: { title: string; series: SeriesPoint[]; accent: string }) => {
		const max = Math.max(1, ...series.map(p => p.count));
		return (
			<div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm p-4">
				<div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{title}</div>
				<div className="h-28 flex items-end gap-1">
					{series.map((p, idx) => (
						<div key={idx} className={`flex-1 rounded-t ${accent}`} style={{ height: `${(p.count / max) * 100}%` }} title={`${p.date}: ${p.count}`} />
					))}
				</div>
				<div className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-slate-500 dark:text-slate-400">
					{series.map((p, idx) => (
						<div key={idx} className="truncate" title={p.date}>{p.date.slice(5)}</div>
					))}
				</div>
			</div>
		);
	};

	const StatCard = ({ label, value, icon, accent }: { label: string; value: number | string; icon: JSX.Element; accent: string }) => (
		<div className="group relative rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
			<div className="p-4 flex items-center gap-3">
				<div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>{icon}</div>
				<div>
					<div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
					<div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
				</div>
			</div>
			<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/5 group-hover:ring-slate-900/10 dark:group-hover:ring-white/10" />
		</div>
	);

	const TopList = ({ title, items, countKey }: { title: string; items: TopContent[]; countKey: 'sessions_count' | 'responses_count' }) => (
		<div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
			<div className="p-4">
				<div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{title}</div>
				<div className="space-y-2">
					{items.length === 0 ? (
						<div className="text-xs text-slate-500 dark:text-slate-400">No data yet</div>
					) : items.map((c) => (
						<a key={c.id} href={route('contents.show', c.id)} className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60">
							<div className="min-w-0">
								<div className="truncate text-slate-900 dark:text-slate-100 text-sm font-medium">{c.title}</div>
								<div className="text-[11px] text-slate-500 dark:text-slate-400">{c.type === 'survey' ? 'Survey' : 'Tip'}</div>
							</div>
							<span className="ml-3 inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs px-2 py-0.5 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60">
								<svg aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4a2 2 0 0 0-2 2v13l5-3 5 3 5-3 3 1.8V6a2 2 0 0 0-2-2H5Z"/></svg>
								{(c as any)[countKey] ?? 0}
							</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
		>
			<Head title="Dashboard" />

			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-4 flex flex-wrap gap-2 text-sm justify-end">
                        <a href={route('contents.index')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z"/></svg>
                            New Content
                        </a>
                        <a href={route('responses.index')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60">
                            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4a2 2 0 0 0-2 2v13l5-3 5 3 5-3 3 1.8V6a2 2 0 0 0-2-2H5Z"/></svg>
                            View Responses
                        </a>
                    </div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
						<StatCard label="Contents" value={s.contents} accent="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200" icon={<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"/></svg>} />
						<StatCard label="Tips" value={s.tips} accent="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200" icon={<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18h6v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Zm3-16a7 7 0 0 1 7 7c0 2.563-1.5 4.5-3 6h-8c-1.5-1.5-3-3.437-3-6a7 7 0 0 1 7-7Z"/></svg>} />
						<StatCard label="Surveys" value={s.surveys} accent="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200" icon={<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4a2 2 0 0 0-2 2v13l5-3 5 3 5-3 3 1.8V6a2 2 0 0 0-2-2H5Z"/></svg>} />
						<StatCard label="Sessions" value={s.sessions} accent="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200" icon={<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6H4V5Zm0 8h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"/></svg>} />
						<StatCard label="Responses" value={s.responses} accent="bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200" icon={<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v11.25A2.75 2.75 0 0 1 18.25 21H7.5L3 17.5V7Z"/></svg>} />
					</div>

					<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
						<Chart title="Sessions - last 7 days" series={a.sessionsByDay} accent="bg-blue-500/70" />
						<Chart title="Responses - last 7 days" series={a.responsesByDay} accent="bg-emerald-500/70" />
					</div>

					<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
						<TopList title="Top contents by sessions" items={t.bySessions} countKey="sessions_count" />
						<TopList title="Top contents by responses" items={t.byResponses} countKey="responses_count" />
					</div>

				</div>
			</div>
		</AuthenticatedLayout>
	);
}
