<?php

namespace Tests\Feature;

use Tests\TestCase;

class SpaRoutingTest extends TestCase
{
    public function test_front_routes_serve_the_vue_application(): void
    {
        $this->withoutVite();

        $this->get('/')->assertOk()->assertViewIs('app');
        $this->get('/requests/12/edit')->assertOk()->assertViewIs('app');
    }

    public function test_unknown_api_routes_are_not_served_by_the_vue_application(): void
    {
        $this->getJson('/api/unknown')->assertNotFound();
    }
}
