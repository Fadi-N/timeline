<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FolderController extends Controller
{

    // Get all folders
    public function index()
    {
        $folders = Folder::all();

        return inertia('Folders/Index', ['folders' => $folders]);
    }

    // Store new folder
    public function store(Request $request)
    {
        // Folder name validation
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        //Create new folder
        $folder = new Folder();
        $folder->name = $request->name;
        $folder->save();

        // Redirect after creating new folder
        return redirect()->route('folders')->with('success', 'Folder added!');
    }

    // Method to handle route from query string
    public function showNotesById(Request $request)
    {
        $folderId = $request->query('id');
        $folder = Folder::findOrFail($folderId);
        $notes = $folder->notes()->get();

        return Inertia::render('Notes', [
            'folder' => $folder,
            'notes' => $notes
        ]);
    }
}
