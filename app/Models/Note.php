<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
        "start_date",
        "end_date",
        "status",
        "folder_id"
    ];

    public function folder(){
        return $this->belongsTo(Folder::class);
    }
}
