<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('request_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->string('description');
            $table->string('status')->default('pending');
            $table->string('comment')->nullable();
            $table->string('review')->nullable();
            $table->string('time');
            $table->string('user_id')->constrained('users');
            $table->string('partner_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_sessions');
    }
};
