import { Session, Response } from '@/types';

export default function Show({ session, onClose }: { session: Session; onClose: () => void }) {
    const responses: Response[] = session?.responses || [];

    return (
        <div className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold mb-1">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                            {session.content?.title ?? ''}
                        </span>
                        <span
                            className={
                                `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 align-middle ring-1 ring-inset ` +
                                (session.content?.type === 'survey'
                                    ? 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:ring-purple-800'
                                    : 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:ring-amber-800')
                            }
                        >
                            <span className="mr-1">{session.content?.type === 'survey' ? '🗳️' : '💡'}</span>
                            {session.content?.type === 'survey' ? 'Survey' : 'Tip'}
                        </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 ring-1 ring-inset ring-green-200/60 dark:ring-green-800/60">
                            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5a2 2 0 0 1 2-2h2.6a2 2 0 0 1 1.789 1.106l.222.444A2 2 0 0 0 11.4 6h2.2a2 2 0 0 0 1.789-1.45l.222-.9A2 2 0 0 1 17.4 2H19a2 2 0 0 1 2 2v2H3V5Z" opacity=".4"/><path d="M3 8h18v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm4 3.5A1.5 1.5 0 1 0 8.5 13 1.5 1.5 0 0 0 7 11.5Zm3.75 3.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5Z"/></svg>
                            {session.ip_address ?? ''}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 ring-1 ring-inset ring-yellow-200/60 dark:ring-yellow-800/60">
                            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h6.586a2 2 0 0 1 1.414.586l3.414 3.414A2 2 0 0 1 18 8.414V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z" opacity=".4"/><path d="M8 7.75A.75.75 0 0 1 8.75 7h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 8 7.75Zm0 3A.75.75 0 0 1 8.75 10h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 10.75Z"/></svg>
                            {session.url ?? ''}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-inset ring-blue-200/60 dark:ring-blue-800/60">
                            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 3a2 2 0 0 0-2 2v14l7-4 7 4V5a2 2 0 0 0-2-2H7Z"/></svg>
                            {session.user_agent ?? ''}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-orange-300 ring-1 ring-inset ring-gray-200/60 dark:ring-gray-800/60">
                            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a9.5 9.5 0 1 1 9.5-9.5A9.51 9.51 0 0 1 12 22Zm.75-14a.75.75 0 0 0-1.5 0v4.25A.75.75 0 0 0 12 13h3a.75.75 0 0 0 0-1.5h-2.25Z"/></svg>
                            {session.created_at ? new Date(session.created_at).toLocaleString() : ''}
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 0 1 1.415 1.414L13.415 10.586l4.361 4.361a1 1 0 1 1-1.415 1.415L12 12l-4.361 4.362a1 1 0 0 1-1.414-1.415l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"/></svg>
                </button>
            </div>

            {responses.length > 0 ? (
                <div className="mt-3">
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                        {responses.map((r: Response, idx: number) => (
                            <div
                                key={r.id}
                                className="group relative rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-3">
                                    <div className="mb-1 flex items-start gap-2">
                                        <span className="mt-0.5 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 text-xs font-semibold ring-1 ring-inset ring-slate-200/60 dark:ring-slate-700/60">
                                            {idx + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900 dark:text-slate-100">
                                                {r.question?.body ?? ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <span className="inline-flex items-center gap-2 rounded-md bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm px-2.5 py-1 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60">
                                            <svg aria-hidden="true" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7H4a2 2 0 0 0-2 2v8.25A2.75 2.75 0 0 0 4.75 20h14.5A2.75 2.75 0 0 0 22 17.25V9a2 2 0 0 0-2-2Z" opacity=".3"/><path d="M18.25 4A2.75 2.75 0 0 1 21 6.75V17c0 .69-.56 1.25-1.25 1.25H4.25A1.25 1.25 0 0 1 3 17V6.75A2.75 2.75 0 0 1 5.75 4h12.5Z"/></svg>
                                            {r.option?.label || r.option?.body || r.body || ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/5 group-hover:ring-slate-900/10 dark:group-hover:ring-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
} 