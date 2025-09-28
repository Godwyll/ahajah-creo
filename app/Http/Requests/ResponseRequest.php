<?php

namespace App\Http\Requests;

class ResponseRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function store(): array
    {
        return [
            'question_id' => 'required|integer|exists:questions,id',
            'session_id' => 'required|integer|exists:sessions,id',
            'option_id' => 'nullable|integer|exists:options,id',
            'body' => 'nullable|string',
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
            'question_id' => 'required|integer|exists:questions,id',
            'session_id' => 'required|integer|exists:sessions,id',
            'option_id' => 'required|integer|exists:options,id',
            'body' => 'nullable|string',
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
            'id' => 'required|integer|exists:responses,id'
        ];
    }
}
