<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(WidgetSeeder::class);
        $this->call(ContentSeeder::class);
        $this->call(QuestionSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(SessionSeeder::class);
        $this->call(ResponseSeeder::class);
    }
}
