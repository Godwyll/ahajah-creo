<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Response;
use App\Models\Session;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => $this->stats(),
            'analytics' => $this->analytics(),
            'top' => $this->top(),
        ]);
    }

    protected function stats(): array
    {
        return [
            'contents'  => Content::count(),
            'tips'      => Content::where('type', 'tip')->count(),
            'surveys'   => Content::where('type', 'survey')->count(),
            'sessions'  => Session::count(),
            'responses' => Response::count(),
        ];
    }

    protected function analytics(): array
    {
        $days = collect(range(0, 6))->map(function ($i) {
            $day = now()->subDays(6 - $i)->startOfDay();
            return [
                'date'  => $day->toDateString(),
                'start' => $day,
                'end'   => (clone $day)->endOfDay(),
            ];
        });

        $sessionsByDay = $days->map(function ($d) {
            return [
                'date'  => $d['date'],
                'count' => Session::whereBetween('created_at', [$d['start'], $d['end']])->count(),
            ];
        })->values();

        $responsesByDay = $days->map(function ($d) {
            return [
                'date'  => $d['date'],
                'count' => Response::whereBetween('created_at', [$d['start'], $d['end']])->count(),
            ];
        })->values();

        return [
            'sessionsByDay'  => $sessionsByDay,
            'responsesByDay' => $responsesByDay,
        ];
    }

    protected function top(): array
    {
        $topBySessions = Content::query()
            ->select('contents.id', 'contents.title', 'contents.type', DB::raw('COUNT(sessions.id) as sessions_count'))
            ->leftJoin('sessions', 'sessions.content_id', '=', 'contents.id')
            ->groupBy('contents.id', 'contents.title', 'contents.type')
            ->orderByDesc('sessions_count')
            ->limit(5)
            ->get();

        $topByResponses = Content::query()
            ->select('contents.id', 'contents.title', 'contents.type', DB::raw('COUNT(responses.id) as responses_count'))
            ->leftJoin('sessions', 'sessions.content_id', '=', 'contents.id')
            ->leftJoin('responses', 'responses.session_id', '=', 'sessions.id')
            ->groupBy('contents.id', 'contents.title', 'contents.type')
            ->orderByDesc('responses_count')
            ->limit(5)
            ->get();

        return [
            'bySessions'  => $topBySessions,
            'byResponses' => $topByResponses,
        ];
    }
} 