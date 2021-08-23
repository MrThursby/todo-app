<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\TodoItem\TodoItemStoreRequest;
use App\Http\Requests\TodoItem\TodoItemUpdateRequest;
use App\Models\TodoItem;
use Illuminate\Http\JsonResponse;

class TodoItemController extends Controller
{
    public function storeAction(TodoItemStoreRequest $request): JsonResponse
    {
        $item = new TodoItem($request->validated());
        return $this->responseStatus($item->save());
    }

    public function updateAction(TodoItemUpdateRequest $request, int $id): JsonResponse
    {
        $item = TodoItem::query()->findOrFail($id);

        return $this->responseStatus($item->update(
            $request->validated()
        ));
    }

    public function destroyAction(int $id): JsonResponse
    {
        $item = TodoItem::query()->findOrFail($id);
        return $this->responseStatus($item->delete());
    }
}
