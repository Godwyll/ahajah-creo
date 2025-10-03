<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Inertia\Inertia;
use App\Models\Farm;
use App\Http\Requests\FarmRequest;

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $farms = Farm::with(['createdBy'])->get();
        return Inertia::render('Farms/Index', ['farms' => $farms]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Farms/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FarmRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();
            $validated['created_by'] = auth()->user()->id;

            // Handle image upload
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('farms', 'public');
            }

            Farm::create($validated);
            session()->flash('success', 'Farm created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('farms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Farm $farm)
    {
        return Inertia::render('Farms/Show', ['farm' => $farm]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Farm $farm)
    {
        return Inertia::render('Farms/Edit', ['farm' => $farm]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FarmRequest $request, Farm $farm): RedirectResponse
    {
        try {
            $validated = $request->validated();

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($farm->image) {
                    \Storage::disk('public')->delete($farm->image);
                }
                $validated['image'] = $request->file('image')->store('farms', 'public');
            } else {
                // Remove image from validated data to keep existing image
                unset($validated['image']);
            }

            $farm->update($validated);
            session()->flash('success', 'Farm updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('farms.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FarmRequest $request, Farm $farm): RedirectResponse
    {
        try {
            $farm->delete($request->validated());
            session()->flash('success', 'Farm deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('farms.index');
    }
}
