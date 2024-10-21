<?php

use App\Http\Controllers\FolderController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/folders', function () {
    $folders = \App\Models\Folder::all();

    return Inertia::render('Dashboard', [
        'folders' => $folders
    ]);
})->middleware(['auth', 'verified'])->name('folders');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/folders', [FolderController::class, 'store'])->name('folders.store');
    Route::get('/folder/notes', [FolderController::class, 'showNotesById'])->middleware(['auth', 'verified'])->name('folders.notes');

    Route::post('/notes', [NoteController::class, 'store'])->name('notes.store');
    Route::patch('/notes/{id}', [NoteController::class, 'update'])->name('notes.update');
    Route::delete('/notes/{id}', [NoteController::class, 'destroy'])->name('notes.destroy');

});

require __DIR__.'/auth.php';
