<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'created_by', 'content_id', 'response_type', 'body'
    ];

    /**
     * Model Relationships.
     */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
    }

}
