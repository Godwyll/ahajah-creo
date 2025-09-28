<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Models\Session;

class SessionController extends Controller
{
    /**
     * Remove the specified session from storage.
     */
    public function destroy(Session $session): RedirectResponse
    {
        try {
            // Delete related responses first to satisfy FK constraints
            $session->responses()->delete();
            $session->delete();
            session()->flash('success', 'Session deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Sorry, something went wrong.');
        }

        return redirect()->route('responses.index');
    }
}
