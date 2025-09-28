<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Inertia\Inertia;
use App\Http\Requests\ContentRequest;
use App\Models\Content;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = Content::with(['createdBy'])->get();
        return Inertia::render('Contents/Index', [
            'contents' => $contents
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contents/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContentRequest $request): RedirectResponse
    {
        try {
            $content = $request->validated();
            $content['created_by'] = auth()->user()->id;
            Content::create($content);
            session()->flash('success', 'Content created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('contents.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        return Inertia::render('Contents/Show', [
            'content' => $content
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        return Inertia::render('Contents/Edit', [
            'content' => $content
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContentRequest $request, Content $content): RedirectResponse
    {
        try {
            $content->update($request->validated());
            session()->flash('success', 'Content updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('contents.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContentRequest $request, Content $content): RedirectResponse
    {
        try {
            $content->delete($request->validated());
            session()->flash('success', 'Content deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('contents.index');
    }

}
