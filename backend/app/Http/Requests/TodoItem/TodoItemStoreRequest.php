<?php

declare(strict_types=1);

namespace App\Http\Requests\TodoItem;

use Illuminate\Foundation\Http\FormRequest;

class TodoItemStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'list_id' => 'numeric|exists:todo_lists,id',
            'title' => 'string|min:1|max:255'
        ];
    }
}
