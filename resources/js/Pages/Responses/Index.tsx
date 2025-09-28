import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, Session } from '@/types';
import DataTable from 'react-data-table-component';
import { useEffect, useMemo, useState } from 'react';
import Modal from '@/Components/Modal';
import Show from './Show';

export default function Index({ auth, sessions }: PageProps<{ sessions: Session[] }>) {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState(sessions);
    const [open, setOpen] = useState(false);
    const [activeSession, setActiveSession] = useState<Session | null>(null);

    useEffect(() => {
        const term = search.toLowerCase();
        setFiltered(
            sessions.filter(s =>
                (s.ip_address || '').toLowerCase().includes(term) ||
                (s.content?.title || '').toLowerCase().includes(term) ||
                (s.user_agent || '').toLowerCase().includes(term) ||
                (s.url || '').toLowerCase().includes(term)
            )
        );
    }, [search, sessions]);

    const sessionColumns = useMemo(() => [
        {
            name: '#',
            cell: (_row: Session, index: number) => index + 1,
            width: '60px',
        },
        { name: 'IP Address', selector: (row: Session) => row.ip_address ?? '', sortable: true, width: '120px' },
        { name: 'Content', selector: (row: Session) => row.content?.title ?? '', sortable: true },
        { name: 'Referrer Url', selector: (row: Session) => row.url ?? '', sortable: true, wrap: true },
        { name: 'Created At', selector: (row: Session) => new Date(row.created_at ?? '').toLocaleString(), sortable: true },
        {
            name: 'Actions',
            cell: (row: Session) => (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setActiveSession(row); setOpen(true); }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-blue-600 hover:text-blue-900 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-200 dark:hover:bg-blue-950/30 transition"
                        aria-label="View"
                        title="View"
                    >
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Delete this session and all its responses?')) {
                                router.delete(route('sessions.destroy', { session: row.id }), {
                                    onSuccess: () => window.location.reload(),
                                });
                            }
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-red-600 hover:text-red-900 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-200 dark:hover:bg-red-950/30 transition"
                        aria-label="Delete"
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
        },
    ], []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Sessions</h2>}
        >
            <Head title="Sessions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <div className="mb-4 flex justify-end">
                            <div className="relative w-full max-w-md">
                            <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3.75a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Zm7.53 12.72 3.25 3.25a.75.75 0 1 1-1.06 1.06l-3.25-3.25a8.75 8.75 0 1 1 1.06-1.06Z"/></svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        </div>
                        <DataTable
                            columns={sessionColumns}
                            data={filtered}
                            pagination
                            highlightOnHover
                            pointerOnHover
                            responsive
                            paginationComponentOptions={{ rowsPerPageText: 'Rows', rangeSeparatorText: 'of' }}
                            customStyles={{
                                table: { style: { backgroundColor: 'transparent' } },
                                headRow: { style: { backgroundColor: 'rgb(31 41 55 / var(--tw-bg-opacity))', color: '#fff' } },
                                rows: { style: { backgroundColor: 'transparent', color: '#fff' } },
                                pagination: { style: { backgroundColor: 'transparent', color: '#fff' } },
                            }}
                        />
                    </div>
                </div>
            </div>

            <Modal show={open} onClose={() => setOpen(false)} maxWidth="3xl">
                {activeSession && <Show session={activeSession} onClose={() => setOpen(false)} />}
            </Modal>
        </AuthenticatedLayout>
    );
} 