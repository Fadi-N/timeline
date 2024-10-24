<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Folder extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function updateLastNoteUpdatedAt(): void
    {
        $this->last_note_updated_at = $this->notes()->max('updated_at');
        $this->save();
    }
}
