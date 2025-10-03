<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => $this->stats(),
        ]);
    }

    protected function stats(): array
    {
        return [
            'contents'  => 0,
            'tips'      => 0,
            'surveys'   => 0,
            'sessions'  => 0,
            'responses' => 0,
        ];
    }

}
