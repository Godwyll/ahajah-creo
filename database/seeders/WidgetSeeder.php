<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Widget;


class WidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Widget::create([
            'name' => 'ISTAD Widget',
            'description' => 'Infomation Security and Technology Assurance Division',
            'image' => 'istad.png',
            'slug' => 'istad-widget',
            'created_by' => 1,
            'is_active' => 1,
        ]);
    }
}
