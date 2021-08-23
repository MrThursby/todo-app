<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoList\TodoListRequest;
use App\Http\Requests\TodoList\TodoListShowRequest;
use App\Models\TodoList;
use Illuminate\Http\JsonResponse;

class TodoListController extends Controller
{
    public function indexAction(): JsonResponse
    {
        $lists = TodoList::all();
        return response()->json($lists);
    }

    public function storeAction(TodoListRequest $request): JsonResponse
    {
        $list = new TodoList($request->validated());
        return $this->responseStatus($list->save());
    }

    public function showAction(TodoListShowRequest $request, int $id): JsonResponse
    {
        $list = TodoList::query();

        // FILTERS
        if($request->has('search') OR $request->has('is_completed')) {
            $list = $list->with(['items' => function ($query) use ($request) {
                if($request->has('search')){
                    $query->where('title', 'LIKE', '%'.$request->input('search').'%');
                }
                if($request->has('is_completed')){
                    $query->where('is_completed', '=', (int) $request->input('is_completed'));
                }
            }]);
        } else {
            $list = $list->with('items');
        }

        $list = $list->findOrFail($id);

        return response()->json($list);
    }

    public function updateAction(TodoListRequest $request, int $id): JsonResponse
    {
        $list = TodoList::query()->findOrFail($id);

        return $this->responseStatus($list->update(
            $request->validated()
        ));
    }

    public function destroyAction(int $id): JsonResponse
    {
        $list = TodoList::query()->findOrFail($id);
        return $this->responseStatus($list->delete());
    }
}
