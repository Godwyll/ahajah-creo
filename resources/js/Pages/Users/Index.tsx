import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    // Filter users when search changes
    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const columns = [
        {
            name: '#',
            selector: (row: User) => row.id,
            sortable: true,
            width: '60px',
        },
        {
            name: 'Name',
            selector: (row: User) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: User) => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (user: User) => (
                <>
                    <Link
                        href={route('users.edit', { user: user.id })}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-200 dark:hover:bg-indigo-950/30 transition mr-2"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this user?')) {
                                router.delete(route('users.destroy', { user: user.id }), {
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
                </>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>}
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <Link
                            href={route('users.create')}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-600/20"
                        >
                            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.75a.75.75 0 0 1 .75.75v5.75H18.5a.75.75 0 0 1 0 1.5h-5.75V18.5a.75.75 0 0 1-1.5 0v-5.75H5.5a.75.75 0 0 1 0-1.5h5.75V5.5A.75.75 0 0 1 12 4.75Z"/></svg>
                            Create User
                        </Link>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <div className="mb-4 flex justify-end">
                            <div className="relative w-full max-w-xs">
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
                            columns={columns}
                            data={filteredUsers}
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
        </AuthenticatedLayout>
    );
}
