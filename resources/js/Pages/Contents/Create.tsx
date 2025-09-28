import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

export default function Create({ auth, ziggy, onClose }: PageProps & { onClose: () => void }) {
    type QuestionInput = { body: string; response_type: 'option' | 'text'; options?: string[] };

    const { data, setData, post, processing, errors } = useForm({
        type: '',
        title: '',
        body: '',
        is_active: true,
        questions: [] as QuestionInput[],
    });

    const [optionInputs, setOptionInputs] = useState<{ [index: number]: string }>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('contents.store'), {
            onSuccess: () => onClose(),
        });
    }

    const addQuestion = () => {
        setData('questions', [...(data.questions || []), { body: '', response_type: 'text' }]);
    };

    const updateQuestion = (index: number, updated: Partial<QuestionInput>) => {
        const next = [...(data.questions || [])];
        next[index] = { ...next[index], ...updated } as QuestionInput;
        setData('questions', next);
    };

    const removeQuestion = (index: number) => {
        const next = [...(data.questions || [])];
        next.splice(index, 1);
        setData('questions', next);
    };

    const addOption = (index: number) => {
        const value = (optionInputs[index] || '').trim();
        if (!value) return;
        const current = data.questions?.[index]?.options || [];
        if (current.includes(value)) return;
        const next = [...current, value];
        updateQuestion(index, { options: next });
        setOptionInputs(prev => ({ ...prev, [index]: '' }));
    };

    const removeOption = (index: number, optionIndex: number) => {
        const current = data.questions?.[index]?.options || [];
        const next = [...current];
        next.splice(optionIndex, 1);
        updateQuestion(index, { options: next });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col max-h-[80vh] overflow-hidden">
            <h2 className="font-semibold text-xl leading-tight mb-4"><span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">Create Content</span></h2>
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-6 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 ring-1 ring-inset ring-slate-200/70 dark:ring-slate-700/60 p-3">
                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type <span className="text-red-500">*</span></label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.type} onChange={e => setData('type', e.target.value)} required
                        >
                            <option value="">- Select -</option>
                            <option value="tip">Tip</option>
                            <option value="survey">Survey</option>
                        </select>
                        {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                    </div>
                    <div className="md:col-span-7 min-w-0">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            type="text" value={data.title} onChange={e => setData('title', e.target.value)} required
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                    </div>
                </div>

                {data.type === 'tip' ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description <span className="text-red-500">*</span></label>
                        <textarea
                            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.body} onChange={e => setData('body', e.target.value)} rows={2} required
                        />
                        {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
                    </div>
                ) : null}

                {data.type === 'survey' ? (
                    <div className="space-y-3">
                        <div className="justify-between">
                            {data.questions && data.questions.length > 0 ? (
                                <div className="space-y-3">
                                    {data.questions.map((q: QuestionInput, i: number) => (
                                        <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
                                            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">
                                                <div className="md:col-span-7 min-w-0">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Question <span className="text-red-500">*</span></label>
                                                    <input
                                                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        type="text" value={q.body} onChange={e => updateQuestion(i, { body: e.target.value })} placeholder="Enter question text"
                                                    />
                                                    {errors[`questions.${i}.body` as keyof typeof errors] && (
                                                            <div className="text-red-500 text-xs mt-1">{String(errors[`questions.${i}.body` as keyof typeof errors])}</div>
                                                        )}
                                                </div>
                                                <div className="md:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Response Type <span className="text-red-500">*</span></label>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <select
                                                            value={q.response_type}
                                                            onChange={e => {
                                                                const newType = e.target.value as QuestionInput['response_type'];
                                                                const changes: Partial<QuestionInput> = { response_type: newType };
                                                                if (newType === 'option' && !q.options) {
                                                                    changes.options = [];
                                                                }
                                                                updateQuestion(i, changes);
                                                            }}
                                                            className="block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="text">Text</option>
                                                            <option value="option">Option</option>
                                                        </select>
                                                        <button
                                                            type="button" onClick={() => removeQuestion(i)} aria-label="Remove question"
                                                            className="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30 ring-1 ring-inset ring-red-600/10"
                                                        >
                                                            <i aria-hidden="true" className="fa-solid fa-trash text-base"></i>
                                                        </button>
                                                    </div>
                                                    {errors[`questions.${i}.response_type` as keyof typeof errors] && (
                                                            <div className="text-red-500 text-xs mt-1">{String(errors[`questions.${i}.response_type` as keyof typeof errors])}</div>
                                                        )}
                                                </div>
                                                
                                                {q.response_type === 'option' && (
                                                    <div className="mt-2 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                className="rounded-md border-gray-300 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                type="text" value={optionInputs[i] || ''} onChange={e => setOptionInputs(prev => ({ ...prev, [i]: e.target.value }))}
                                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addOption(i); } }} placeholder="Option text"
                                                            />
                                                            <button
                                                                type="button" onClick={() => addOption(i)}
                                                                className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
                                                            >
                                                                <i aria-hidden="true" className="fa-solid fa-plus text-xs"></i>
                                                                <span className="text-xs">Add</span>
                                                            </button>
                                                            {q.options && q.options.map((opt: string, oi: number) => (
                                                                <span key={oi} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs">
                                                                    {opt}
                                                                    <button
                                                                        type="button" onClick={() => removeOption(i, oi)} className="ml-1 text-red-500 hover:text-red-600"
                                                                    >
                                                                        <i aria-hidden="true" className="fa-solid fa-xmark"></i>
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <button type="button" onClick={addQuestion} className="inline-flex items-center mt-2 gap-2 px-2 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-600/20">
                                + Add Question
                            </button>
                        </div>
                        
                    </div>
                    
                ) : null}

                <div className="flex items-center">
                    <input
                        id="is_active" type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                        Active
                    </label>
                    {errors.is_active && <div className="text-red-500 text-xs mt-1">{errors.is_active}</div>}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button type="button" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:underline">Cancel</button>
                <button type="submit" disabled={processing} className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-600/20 disabled:opacity-50">
                    <i aria-hidden="true" className="fa-solid fa-plus"></i>
                    Create
                </button>
            </div>
        </form>
    );
}
