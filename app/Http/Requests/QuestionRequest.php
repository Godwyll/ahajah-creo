<?php

namespace App\Http\Requests;

class QuestionRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function store(): array
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'content_id' => 'required|integer|exists:contents,id',
            'body' => 'required|string',
            'response_type' => 'required|string',
            'is_active' => 'bool',
            'sort_order' => 'nullable|integer',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function update(): array
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'content_id' => 'required|integer|exists:contents,id',
            'body' => 'required|string',
            'response_type' => 'required|string',
            'is_active' => 'bool',
            'sort_order' => 'nullable|integer',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function delete(): array
    {
        return [
            'id' => 'required|integer|exists:questions,id'
        ];
    }
}
