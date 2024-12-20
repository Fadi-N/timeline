<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // Store new Note
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'required|date_format:Y-m-d H:i:s|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'folder_id' => 'required|exists:folders,id'
        ]);

        $note = new Note();
        $note->title = $request->title;
        $note->description = $request->description;
        $note->start_date = $request->start_date;
        $note->end_date = $request->end_date;
        $note->status = $request->status;
        $note->folder_id = $request->folder_id;
        $note->save();

        $folder = $note->folder;
        $folder->updateLastNoteUpdatedAt();

        return redirect()->back()->with('success', 'Note created!');

    }

    public function update(Request $request, $id)
    {
        if ($request->has('status') && count($request->all()) == 1) {
            $request->validate([
                'status' => 'required|in:pending,in_progress,completed',
            ]);

            $note = Note::findOrFail($id);
            $note->status = $request->status;
            $note->save();

            $folder = $note->folder;
            $folder->updateLastNoteUpdatedAt();

            return redirect()->back()->with('success', 'Note status updated successfully!');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'required|date_format:Y-m-d H:i:s|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $note = Note::findOrFail($id);
        $note->title = $request->title;
        $note->description = $request->description;
        $note->start_date = $request->start_date;
        $note->end_date = $request->end_date;
        $note->status = $request->status;
        $note->save();

        $folder = $note->folder;
        $folder->updateLastNoteUpdatedAt();

        return redirect()->back()->with('success', 'Note updated successfully!');
    }


    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();

        $folder = $note->folder;
        $folder->updateLastNoteUpdatedAt();

        return redirect()->back()->with('success', 'Note deleted successfully!');
    }

}
