<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'date' => fake()->date(),
            'image' => fake()->imageUrl(),
            'location' => fake()->city(),
            'address' => fake()->address(),
            'user_id' => 1,
        ];
    }
}
