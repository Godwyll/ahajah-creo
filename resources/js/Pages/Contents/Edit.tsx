import { useForm } from '@inertiajs/react';
import { PageProps, Content } from '@/types';

export default function Edit({ content, onClose }: PageProps<{ content: Content }> & { onClose: () => void }) {
    const { data, setData, patch, processing, errors } = useForm({
        type: content.type,
        title: content.title,
        body: content.body,
        is_active: content.is_active,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch(route('contents.update', { content: content.id }), {
            onSuccess: () => onClose(),
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight mb-4">Edit Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type <span className="text-red-500">*</span></label>
                    <select
                        value={data.type}
                        onChange={e => setData('type', e.target.value as Content['type'])}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="tip">Tip</option>
                        <option value="survey">Survey</option>
                    </select>
                    {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                </div>
                <div className="md:col-span-7 min-w-0">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description <span className="text-red-500">*</span></label>
                <textarea
                    value={data.body ?? ''}
                    onChange={e => setData('body', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={2}
                    required
                />
                {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
            </div>
            <div className="flex items-center">
                <input
                    id="is_active"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={e => setData('is_active', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                    Active
                </label>
                {errors.is_active && <div className="text-red-500 text-xs mt-1">{errors.is_active}</div>}
            </div>
            <div className="flex items-center justify-between">
                <button type="button" onClick={onClose} className="text-gray-600 dark:text-gray-300 hover:underline">Cancel</button>
                <button type="submit" disabled={processing} className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">Update</button>
            </div>
        </form>
    );
}
