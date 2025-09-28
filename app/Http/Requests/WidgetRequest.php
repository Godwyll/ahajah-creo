<?php

namespace App\Http\Requests;

class WidgetRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function store(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'slug' => 'required|string|unique:widgets,slug',
            'is_active' => 'bool',
        ];
    }

    public function update(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'slug' => 'required|string|unique:widgets,slug,' . $this->route('widget')->id,
            'is_active' => 'bool',
        ];
    }

    public function delete(): array
    {
        return [
            'id' => 'required|integer|exists:widgets,id'
        ];
    }
}
