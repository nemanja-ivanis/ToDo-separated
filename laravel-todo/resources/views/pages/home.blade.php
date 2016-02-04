@extends('master')

@section('content')




    @if($check==true)

        <div class="col-md-12">
            <h1>WELCOME {{$username}}</h1>

        </div>
        <div class="container" id="main-content">
            <!--Add task section-->
            <div class="col-md-12">
                <h2>To Do List</h2>
                <p>
                    <label for="new-task">Add Item</label>
                    <input id="new-task" type="text">
                    <button id="add" class="btn btn-primary">Add</button>
                <div class="warning"></div>
                <div class="success"></div>
                </p>
            </div>
            <!--end Add task section-->


            <!--All tasks section-->
            <div class="task-section col-md-3" id="all-section">
                @if($tasks)
                    <h3>All
                        <span id="counter-all">{{count($tasks)}}</span></h3>


                    <ul id="all">


                        @foreach($tasks as $task)

                            @if($task->completed==0 && $task->favorited==0)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star-empty"></span></button>
                                    <button class="complete" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==0 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==1 && $task->favorited==0)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="completed">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star-empty"></span></button>
                                    <button class="complete red" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==1 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="completed">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete red" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>



                            @endif






                        @endforeach

                    </ul>
                    <div id="all-buttons">
                        <button id="remove-all" class="btn btn-danger">Remove All</button>
                        <button id="remove-selected" class="btn btn-warning">Remove Selected</button>

                    </div>


                @else
                    <h3>All
                        <span id="counter-all">0</span></h3>
                    <p>No Tasks</p>

                @endif


            </div>
            <!--end All tasks section-->


            <!--Active tasks section-->
            <div class="task-section col-md-3" id="active-section">
                @if($tasks)
                    <h3>Active
                        <span id="counter-active">{{$active_count}}</span></h3>
                    <ul id="incomplete-tasks">
                        @foreach($tasks as $task)

                            @if($task->completed==0 && $task->favorited==0)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star-empty"></span></button>
                                    <button class="complete" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==0 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>


                            @endif

                        @endforeach
                    </ul>


                @else
                    <h3>Active
                        <span id="counter-active">0</span></h3>
                    <p>No Tasks</p>

                @endif

            </div>
            <!--end Active tasks section-->

            <!--Completed tasks section-->
            <div class="task-section col-md-3" id="completed-section">
                @if($tasks)
                    <h3>Completed
                        <span id="counter-completed">{{$completed_count}}</span></h3>
                    <ul id="completed-tasks">
                        @foreach($tasks as $task)

                            @if($task->completed==1 && $task->favorited==0)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="completed">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star-empty"></span></button>
                                    <button class="complete red" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==1 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="completed">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete red" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>


                            @endif

                        @endforeach
                    </ul>


                @else
                    <h3>Completed
                        <span id="counter-completed">0</span></h3>
                    <p>No Tasks</p>

                @endif
            </div>
            <!--end Completed tasks section-->

            <!--Favorite tasks section-->
            <div class="task-section col-md-3" id="favorite-section">
                @if($tasks)
                    <h3>Favorite
                        <span id="counter-favorite">{{$favorited_count}}</span></h3>
                    <ul id="favorite-tasks">
                        @foreach($tasks as $task)

                            @if($task->completed==0 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>

                            @elseif($task->completed==1 && $task->favorited==1)

                                <li id="task-{{$task->id}}">
                                    <input type="checkbox">
                                    <label class="completed">{{$task->task_name}}</label>
                                    <input type="text" class="inputTask">
                                    <button class="edit" data-toggle="tooltip" title="Edit"><span
                                                class="glyphicon glyphicon-edit"></span></button>
                                    <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                                                class="glyphicon glyphicon-star"></span></button>
                                    <button class="complete red" data-toggle="tooltip" title="Complete"><span
                                                class="glyphicon glyphicon-ok"></span></button>
                                    <button class="delete" data-toggle="tooltip" title="Delete"><span
                                                class="glyphicon glyphicon-trash"></span></button>
                                </li>


                            @endif

                        @endforeach
                    </ul>


                @else
                    <h3>Favorite
                        <span id="counter-favorite">0</span></h3>
                    <p>No Tasks</p>

                @endif

            </div>
            <!--end Favorite tasks section-->

        </div>

    @else

        <h1>YOU MUST BE LOGGED IN TO SEE THIS CONTENT</h1>

    @endif


@stop

@section('footer')
    <script type="text/javascript" src="js/alertify.min.js"></script>
    <script type="text/javascript" src="js/handlebars-1.0.rc.2.js"></script>
    <script type="text/javascript" src="js/todoTaskClass.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <!--Template for new task-->
    <script id="template-add-new" type="text/x-handlebars-template">

        @{{#if_eq tasks_counter 0 }}

        @{{#if_eq ul_id 'all'  }}

        <ul id="@{{ul_id}}">

            <li id="task-@{{last_id}}">
                <input type="checkbox">
                <label class="">@{{task_name}}</label>
                <input type="text" class="inputTask">
                <button class="edit" data-toggle="tooltip" title="Edit"><span class="glyphicon glyphicon-edit"></span>
                </button>
                <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                            class="glyphicon glyphicon glyphicon-star-empty"></span></button>
                <button class="complete" data-toggle="tooltip" title="Complete"><span
                            class="glyphicon glyphicon-ok"></span></button>
                <button class="delete" data-toggle="tooltip" title="Delete"><span
                            class="glyphicon glyphicon-trash"></span></button>
            </li>
        </ul>
        <div id="all-buttons">
            <button id="remove-all" class="btn btn-danger">Remove All</button>
            <button id="remove-selected" class="btn btn-warning">Remove Selected</button>
        </div>

        @{{else}}
        <ul id="@{{ul_id}}">

            <li id="task-@{{last_id}}">
                <input type="checkbox">
                <label class="">@{{task_name}}</label>
                <input type="text" class="inputTask">
                <button class="edit" data-toggle="tooltip" title="Edit"><span class="glyphicon glyphicon-edit"></span>
                </button>
                <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                            class="glyphicon glyphicon glyphicon-star-empty"></span></button>
                <button class="complete" data-toggle="tooltip" title="Complete"><span
                            class="glyphicon glyphicon-ok"></span></button>
                <button class="delete" data-toggle="tooltip" title="Delete"><span
                            class="glyphicon glyphicon-trash"></span></button>
            </li>
        </ul>

        @{{/if_eq}}


        @{{else}}

        <li id="task-@{{last_id}}">
            <input type="checkbox">
            <label class="">@{{task_name}}</label>
            <input type="text" class="inputTask">
            <button class="edit" data-toggle="tooltip" title="Edit"><span class="glyphicon glyphicon-edit"></span>
            </button>
            <button class="favorite" data-toggle="tooltip" title="Favorite"><span
                        class="glyphicon glyphicon glyphicon-star-empty"></span></button>
            <button class="complete" data-toggle="tooltip" title="Complete"><span class="glyphicon glyphicon-ok"></span>
            </button>
            <button class="delete" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span>
            </button>
        </li>

        @{{/if_eq}}

    </script>



    <!--Template for notification messages after add-->
    <script id="add-messages" type="text/x-handlebars-template">


        @{{#if_eq task_name '' }}


        <i class="fa fa-warning"></i> No task added
        @{{else}}
        <i class="fa fa-check"></i>Task added to list

        @{{/if_eq}}


    </script>
@stop
