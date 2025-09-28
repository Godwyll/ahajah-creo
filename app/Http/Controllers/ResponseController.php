<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\ResponseRequest;
use App\Models\Response;
use App\Models\Session;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse
    {
        $sessions = Session::with([
            'content',
            'responses' => function($q){
                $q->with(['question', 'option'])->latest();
            }
        ])->latest()->get()->sortByDesc(function($session) {
            return $session->created_at ?? '';
        });

        return Inertia::render('Responses/Index', [
            'sessions' => $sessions,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResponseRequest $request, Response $response): RedirectResponse
    {
        try {
            $response->delete($request->validated());
            session()->flash('success', 'Response deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }
        return redirect()->route('responses.index');
    }

}
