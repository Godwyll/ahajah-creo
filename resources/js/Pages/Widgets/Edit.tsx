import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

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

export default function Edit({ widget, onClose }: PageProps<{ widget: Widget }> & { onClose: () => void }) {
    const { data, setData, post, processing, errors } = useForm({
        name: widget.name,
        description: widget.description,
        image: null as File | null,
        slug: widget.slug,
        is_active: widget.is_active,
        _method: 'PATCH',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        widget.image ? `/storage/${widget.image}` : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('widgets.update', { widget: widget.id }), {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                window.location.reload();
            },
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight mb-4">Edit Widget</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Slug <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={data.slug}
                        onChange={e => setData('slug', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                    {errors.slug && <div className="text-red-500 text-xs mt-1">{errors.slug}</div>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description <span className="text-red-500">*</span></label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={1}
                    required
                />
                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                    <div className="space-y-1 text-center">
                        {imagePreview ? (
                            <div className="mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                                />
                            </div>
                        ) : (
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        <div className="flex text-sm text-gray-600 dark:text-gray-300">
                            <label
                                htmlFor="image-upload-edit"
                                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-2 py-1"
                            >
                                <span>{imagePreview ? 'Change image' : 'Upload an image'}</span>
                                <input
                                    id="image-upload-edit"
                                    name="image-upload-edit"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        {widget.image && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Leave empty to keep current image
                            </p>
                        )}
                    </div>
                </div>
                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
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
                <button type="submit" disabled={processing} className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                    {processing ? 'Updating...' : 'Update Widget'}
                </button>
            </div>
        </form>
    );
}
