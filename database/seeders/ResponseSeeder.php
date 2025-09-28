<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Response;

class ResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = [
            // Have you ever experienced a cyber attack?
            ['question_id' => 1, 'session_id' => 1, 'option_id' => 1],
            ['question_id' => 1, 'session_id' => 2, 'option_id' => 2],

            // Do you save your passwords on your web browser?
            ['question_id' => 2, 'session_id' => 1, 'option_id' => 1],
            ['question_id' => 2, 'session_id' => 2, 'option_id' => 2],

            // Are you familiar with the authenticators and 2-step verifications? If so, do you use them?
            ['question_id' => 3, 'session_id' => 1, 'body' => 'I use 2FA in most applications that support them.'],
            ['question_id' => 3, 'session_id' => 2, 'body' => 'Yes I use 2-step verification'],

            // What do you do when you receive an email with a link or document?
            ['question_id' => 4, 'session_id' => 1, 'body' => 'I click on it.'],
            ['question_id' => 4, 'session_id' => 2, 'body' => 'I open in a private window.'],

            // What would be your first approach if you sense a security breach?
            ['question_id' => 5, 'session_id' => 1, 'body' => 'I would report it to the IT department.'],
            ['question_id' => 5, 'session_id' => 2, 'body' => 'I would report it to the IT department.'],

            // Who is responsible for installing and maintaining security software on your computer?
            ['question_id' => 6, 'session_id' => 1, 'body' => 'Myself.'],
            ['question_id' => 6, 'session_id' => 2, 'body' => 'The IT department.'],

            // How often do you use Windows Update?
            ['question_id' => 7, 'session_id' => 1, 'body' => 'I have automatic updates enabled.'],
            ['question_id' => 7, 'session_id' => 2, 'body' => 'I use Windows Update frequently.'],

            // Do you have anti-virus software installed on your computer?
            ['question_id' => 8, 'session_id' => 1, 'option_id' => 1],
            ['question_id' => 8, 'session_id' => 2, 'option_id' => 2],

            // Which version of Windows or any other OS is installed on the computer?
            ['question_id' => 9, 'session_id' => 1, 'body' => 'Windows 11'],
            ['question_id' => 9, 'session_id' => 2, 'body' => 'MacOS High Sierra'],

            // Do you use firewall software on your computer?
            ['question_id' => 10, 'session_id' => 1, 'option_id' => 1],
            ['question_id' => 10, 'session_id' => 2, 'option_id' => 2],
        ];

        foreach ($response as $response) {
            Response::create($response);
        }

    }
}
