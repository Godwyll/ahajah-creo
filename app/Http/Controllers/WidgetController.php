<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Inertia\Inertia;
use App\Models\Widget;
use App\Http\Requests\WidgetRequest;

class WidgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $widgets = Widget::with(['createdBy'])->get();
        return Inertia::render('Widgets/Index', ['widgets' => $widgets]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Widgets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WidgetRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $validated['created_by'] = auth()->user()->id;

            // Handle image upload
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('widgets', 'public');
            }

            Widget::create($validated);
            session()->flash('success', 'Widget created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('widgets.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Widget $widget)
    {
        return Inertia::render('Widgets/Show', ['widget' => $widget]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Widget $widget)
    {
        return Inertia::render('Widgets/Edit', ['widget' => $widget]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WidgetRequest $request, Widget $widget): RedirectResponse
    {
        try {
            $validated = $request->validated();

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($widget->image) {
                    \Storage::disk('public')->delete($widget->image);
                }
                $validated['image'] = $request->file('image')->store('widgets', 'public');
            } else {
                // Remove image from validated data to keep existing image
                unset($validated['image']);
            }

            $widget->update($validated);
            session()->flash('success', 'Widget updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('widgets.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WidgetRequest $request, Widget $widget): RedirectResponse
    {
        try {
            $widget->delete($request->validated());
            session()->flash('success', 'Widget deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('widgets.index');
    }
}
