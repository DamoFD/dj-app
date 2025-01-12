<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'artist_name' => 'Test',
            'email' => 'test@test.com',
            'password' => Hash::make('password')
        ]);

        User::factory(10)->create();

        Event::factory(10)->create([
            'user_id' => 1,
        ]);
    }
}
