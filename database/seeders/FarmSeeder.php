<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Farm;


class FarmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Farm::create([
            'name' => 'NASA Farm',
            'description' => 'NASA Farm',
            'image' => 'istad.png',
            'created_by' => 1,
        ]);
    }
}
