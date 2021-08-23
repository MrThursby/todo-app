<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TodoItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        function recalcListCounts($model) {
            $model->list->completed_items_count = $model->list->items()->where('is_completed', '=', 1)->count();
            $model->list->items_count = $model->list->items()->count();
            $model->list->save();
        }

        self::created(fn ($model) => recalcListCounts($model));

        self::updated(fn ($model) => recalcListCounts($model));

        self::deleting(fn ($model) => recalcListCounts($model));
    }

    public function list(): BelongsTo
    {
        return $this->belongsTo(TodoList::class, 'list_id');
    }

    public function getIsCompletedAttribute($value) {
        return (bool) $value;
    }
}
