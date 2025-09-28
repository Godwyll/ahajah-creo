<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use App\Http\Requests\OptionRequest;
use App\Models\Option;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $options = Option::with(['user', 'question'])->get();
        return view('options.index', compact('options'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('options.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OptionRequest $request): RedirectResponse
    {
        try {
            Option::create($request->validated());
            session()->flash('success', 'Option created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('options.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Option $option): View
    {
        return view('options.show', compact('option'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Option $option): View
    {
        return view('options.edit', compact(['option']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OptionRequest $request, Option $option): RedirectResponse
    {
        try {
            $option->update($request->validated());
            session()->flash('success', 'Option updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('options.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OptionRequest $request, Option $option): RedirectResponse
    {
        try {
            $option->delete($request->validated());
            session()->flash('success', 'Option deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('options.index');
    }

}
