<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Session;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sessions = [
            ['ip_address' => '10.40.29.20', 'content_id' => 7, 'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'url' => 'https://apps.knust.edu.gh'],
            ['ip_address' => '10.40.29.22', 'content_id' => 8, 'user_agent' => 'Chrome/127.0.0.0', 'url' => 'https://apps.knust.edu.gh/students'],
            ['ip_address' => '127.0.0.1', 'content_id' => 1, 'user_agent' => 'Safari/537.36', 'url' => 'https://apps.knust.edu.gh/staff'],
        ];

        foreach ($sessions as $session) {
            session::create($session);
        }

    }
}
