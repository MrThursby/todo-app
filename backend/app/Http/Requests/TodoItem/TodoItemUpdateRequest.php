<?php

declare(strict_types=1);

namespace App\Http\Requests\TodoItem;

use Illuminate\Foundation\Http\FormRequest;

class TodoItemUpdateRequest extends FormRequest
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
            'title' => 'string|min:1|max:255|nullable',
            'is_completed' => 'nullable'
        ];
    }
}
