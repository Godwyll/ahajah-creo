interface farm {
    id: number;
    name: string;
    description: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export default function Show({ farm, onClose }: { farm: farm; onClose: () => void }) {
    return (
        <div className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold mb-1">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
                            {farm.name}
                        </span>
                    </h2>
                </div>
                <button onClick={onClose} className="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition">
                    <span className="sr-only">Close</span>
                    <i aria-hidden="true" className="fa-solid fa-xmark"></i>
                </button>
            </div>

            {farm.image && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Image</h4>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60 p-3">
                        <img
                            src={`/storage/${farm.image}`}
                            alt={farm.name}
                            className="h-32 w-32 object-cover rounded-lg mx-auto"
                        />
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</h4>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60 p-3 whitespace-pre-line">
                    {farm.description || 'No description provided'}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Created</h4>
                    <p className="text-slate-600 dark:text-slate-400">{new Date(farm.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Updated</h4>
                    <p className="text-slate-600 dark:text-slate-400">{new Date(farm.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}
