<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TodoList extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public static function boot()
    {
        parent::boot();

        TodoList::deleting(function (TodoList $todoList) {
            $todoList->items()->delete();
        });
    }

    public function items(): HasMany
    {
        return $this->hasMany(TodoItem::class, 'list_id');
    }
}
