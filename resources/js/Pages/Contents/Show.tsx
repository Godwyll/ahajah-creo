import { Content } from '@/types';

export default function Show({ content, onClose }: { content: Content; onClose: () => void }) {
    return (
        <div className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold mb-1">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                            {content.title}
                        </span>
                        <span
                            className={
                                `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 align-middle ring-1 ring-inset ` +
                                (content.is_active
                                    ? 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-800'
                                    : 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:ring-rose-800')
                            }
                        >
                            <span className="mr-1">{content.is_active ? '🟢' : '⛔'}</span>
                            {content.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span
                            className={
                                `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 align-middle ring-1 ring-inset ` +
                                (content.type === 'tip'
                                    ? 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-800'
                                    : 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:ring-purple-800')
                            }
                        >
                            <span className="mr-1">{content.type === 'tip' ? '💡' : '🗳️'}</span>
                            {content.type === 'tip' ? 'Tip' : 'Survey'}
                        </span>
                    </h2>
                </div>
                <button onClick={onClose} className="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition">
                    <span className="sr-only">Close</span>
                    <i aria-hidden="true" className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</h4>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60 p-3 whitespace-pre-line">
                    {content.body ?? ''}
                </div>
            </div>
        </div>
    );
}
