<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Content;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Safeguard Passwords', 'body' => 'Use a strong password for each account. Enable two-factor authentication when available.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Exercise Caution with Suspicious Messages', 'body' => 'Be wary of phishing attempts. Avoid clicking links or downloading attachments from unknown sources.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Reduce Public Wi-Fi Usage for Secure Activities', 'body' => 'Public Wi-Fi networks can be tempting to use but they could be vulnerable. Thus using antivirus software or limiting their usage for sensitive tasks like e-banking is advisable.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Practice Discretion in Social Media Sharing', 'body' => 'Be mindful of what you share on social media. Also, adjust privacy settings to control the visibility of personal content.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Maintain Updated Apps and Software', 'body' => 'Keep your devices, applications, and software current. Doing this ensures you enjoy the latest security patches and bug fixes.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'tip', 'title' => 'Safeguard Your Personal Information', 'body' => 'Be cautious about sharing sensitive information online. Provide data only on secure, reputable websites.', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'survey', 'title' => 'Computer Security Survey', 'widget_id' => 1],
            ['created_by' => 1, 'type' => 'survey', 'title' => 'Cyber Attack Awareness Survey', 'widget_id' => 1],
        ];

        foreach ($contents as $content) {
            Content::create($content);
        }
    }
}
