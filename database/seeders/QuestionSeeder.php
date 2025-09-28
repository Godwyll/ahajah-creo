<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            // Computer Security Survey
            ['created_by' => 1, 'content_id' => 7, 'body' => 'Have you ever experienced a cyber attack?', 'response_type' => 'option', 'sort_order' => 1],
            ['created_by' => 1, 'content_id' => 7, 'body' => 'Do you save your passwords on your web browser?', 'response_type' => 'option', 'sort_order' => 2],
            ['created_by' => 1, 'content_id' => 7, 'body' => 'Are you familiar with the authenticators and 2-step verifications? If so, do you use them?', 'response_type' => 'text', 'sort_order' => 3],
            ['created_by' => 1, 'content_id' => 7, 'body' => 'What do you do when you receive an email with a link or document?', 'response_type' => 'option', 'sort_order' => 4],
            ['created_by' => 1, 'content_id' => 7, 'body' => 'What would be your first approach if you sense a security breach?', 'response_type' => 'option', 'sort_order' => 5],

            // Cyber Attack Awareness Survey
            ['created_by' => 1, 'content_id' => 8, 'body' => 'Who is responsible for installing and maintaining security software on your computer?', 'response_type' => 'option', 'sort_order' => 1],
            ['created_by' => 1, 'content_id' => 8, 'body' => 'How often do you use Windows Update?', 'response_type' => 'option', 'sort_order' => 2],
            ['created_by' => 1, 'content_id' => 8, 'body' => 'Do you have anti-virus software installed on your computer?', 'response_type' => 'option', 'sort_order' => 3],
            ['created_by' => 1, 'content_id' => 8, 'body' => 'Which version of Windows or any other OS is installed on the computer?', 'response_type' => 'text', 'sort_order' => 4],
            ['created_by' => 1, 'content_id' => 8, 'body' => 'Do you use firewall software on your computer?', 'response_type' => 'option', 'sort_order' => 5],
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}
