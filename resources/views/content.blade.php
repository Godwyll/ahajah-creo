<form>
    <div class="form__field">
        <input type="hidden" id="ip-address" value="" />
        <label for="title">{{ $content->title }}</label><br/>

        @if ($content->type == 'survey')
            @foreach ($content->questions as $question)
                <label for="question">{{ $question->body }}</label><br/>
                @if ($question->response_type == 'option')
                    @foreach ($question->options as $option)
                        <div class="option">
                            <input type="radio" name="option[{{ $question->id }}]" id="option{{$option->id}}">
                            <label for="option{{$option->id}}">{{ $option->label }}</label>
                        </div>
                    @endforeach
                @else
                    <input type="text" id="answer" name="answer" /><br/>
                @endif
            @endforeach
        @endif

        <label for="body">{{ $content->body }}</label><br/>

    </div>
    <button>{{$content->type == 'survey' ? 'SEND' : 'OK'}}</button>
</form>
