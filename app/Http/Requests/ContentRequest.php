<?php

namespace App\Http\Requests;

class ContentRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function store(): array
    {
        return [
            'type' => 'required|string',
            'title' => 'required|string',
            'body' => 'nullable|string',
            'is_active' => 'bool',
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
            'type' => 'required|string',
            'title' => 'required|string',
            'body' => 'nullable|string',
            'is_active' => 'bool',
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
            'id' => 'required|integer|exists:contents,id'
        ];
    }
}
