import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import Create from './Create';
import Edit from './Edit';
import Show from './Show';

interface Widget {
    id: number;
    name: string;
    description: string;
    image: string | null;
    slug: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function Index({ auth, widgets, ziggy }: PageProps<{ widgets: Widget[] }>) {
    const [search, setSearch] = useState('');
    const [filteredWidgets, setFilteredWidgets] = useState(widgets);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editWidget, setEditWidget] = useState<Widget | null>(null);
    const [showView, setShowView] = useState(false);
    const [viewWidget, setViewWidget] = useState<Widget | null>(null);

    useEffect(() => {
        setFilteredWidgets(
            widgets.filter(
                (widget) =>
                    widget.name.toLowerCase().includes(search.toLowerCase()) ||
                    widget.description.toLowerCase().includes(search.toLowerCase()) ||
                    widget.slug.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, widgets]);

    const columns = [
        {
            name: '#', cell: (_row: Widget, index: number) => index + 1, width: '60px', sortable: false,
        },
        {
            name: 'Widget',
            cell: (row: Widget) => (
                <div className="flex items-center">
                    {row.image && (
                        <img
                            className="h-10 w-10 rounded-full mr-3"
                            src={`/storage/${row.image}`}
                            alt={row.name}
                        />
                    )}
                    <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {row.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {row.slug}
                        </div>
                    </div>
                </div>
            ),
            sortable: true,
            width: '300px',
        },
        {
            name: 'Description',
            selector: (row: Widget) => row.description,
            sortable: true,
            wrap: true,
            width: '400px',
        },
        {
            name: 'Status',
            cell: (row: Widget) => (
                <span
                    className={
                        `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ring-1 ring-inset ` +
                        (row.is_active
                            ? 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-800'
                            : 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/30 dark:text-red-200 dark:ring-red-800')
                    }
                >
                    <span className="mr-1">{row.is_active ? '✅' : '❌'}</span>
                    {row.is_active ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: true,
            width: '120px',
        },
        {
            name: 'Actions',
            cell: (widget: Widget) => (
                <>
                    <button
                        onClick={() => { setViewWidget(widget); setShowView(true); }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 font-medium mr-4"
                        aria-label="View"
                        title="View"
                    >
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                        onClick={() => {
                            setEditWidget(widget);
                            setShowEdit(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium mr-4"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this widget?')) {
                                router.delete(route('widgets.destroy', { widget: widget.id }), {
                                    onSuccess: () => window.location.reload(),
                                });
                            }
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 font-medium"
                        aria-label="Delete"
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </>
            ),
        },
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Widgets</h2>}
        >
            <Head title="Widgets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowCreate(true)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-600/20"
                        >
                            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z"/></svg>
                                    Create Widget
                        </button>
                            </div>
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <div className="mb-4 flex justify-end">
                            <div className="relative w-full max-w-xs">
                                <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3.75a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Zm7.53 12.72 3.25 3.25a.75.75 0 1 1-1.06 1.06l-3.25-3.25a8.75 8.75 0 1 1 1.06-1.06Z"/></svg>
                                <input
                                    type="text"
                                    placeholder="Search widgets..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredWidgets}
                            pagination
                            highlightOnHover
                            pointerOnHover
                            responsive
                            paginationComponentOptions={{
                                rowsPerPageText: 'Rows',
                                rangeSeparatorText: 'of',
                            }}
                            customStyles={{
                                table: {
                                    style: {
                                        backgroundColor: 'transparent',
                                    },
                                },
                                headRow: {
                                    style: {
                                        backgroundColor: 'rgb(31 41 55 / var(--tw-bg-opacity))',
                                        color: '#fff',
                                    },
                                },
                                rows: {
                                    style: {
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                    },
                                },
                                pagination: {
                                    style: {
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                <Create auth={auth} ziggy={ziggy} onClose={() => setShowCreate(false)} />
            </Modal>
            <Modal show={showEdit} onClose={() => setShowEdit(false)}>
                {editWidget && <Edit auth={auth} ziggy={ziggy} widget={editWidget} onClose={() => setShowEdit(false)} />}
            </Modal>
            <Modal show={showView} onClose={() => setShowView(false)}>
                {viewWidget && <Show widget={viewWidget} onClose={() => setShowView(false)} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
