<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Foundation\Auth\User;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationServiceProvider;
use Illuminate\Validation\Validator;

class TasksController extends Controller
{


    public function checkIfLogged()
    {

        if (Auth::check()) {
            $username = Auth::user()->username;
            return response()->json(['logged' => 1, 'username' => $username]);
        } else {

            return response()->json(['logged' => 0]);
        }

    }

    /**
     * Function for adding new user to database
     * @param Request $request [http request with data]
     * @return json
     */
    public function add(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;
            $task = new Task();
            $task->task_name = $request->task_name;
            $task->user_id = $id;
            $saved = $task->save();

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($saved) {
                return response()->json(['success' => true, 'tasks' => $tasks]);


            } else {

                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }


    /**
     *Function for getting all tasks data
     * @return json
     */
    public function showTasks()
    {

        if (Auth::check()) {

            $id = Auth::user()->id;
            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();


            if ($tasks) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }


    /**
     * Function for updating task name with the new provided in the request
     * @param Request $request [http request with data]
     * @return json
     */
    public function updateTaskName(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;
            $current_name = $request->current_name;
            $new_name = $request->new_name;
            $update = DB::table('tasks')
                ->where('user_id', '=', $id)
                ->where('task_name', $current_name)
                ->update(['task_name' => $new_name]);

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($update) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }

    }


    /**
     * Function for deleting all tasks from database
     * @return json
     */
    public function deleteAll()
    {

        if (Auth::check()) {

            $id = Auth::user()->id;
            $delete_all = DB::table('tasks')->where('user_id', '=', $id)->delete();


            if ($delete_all) {
                return response()->json(['success' => true]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }

    /**
     * Function for deleting all selected tasks from database
     * @return json
     */
    public function deleteSelected(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;
            $ids = $request->data;

            $delete_selected = DB::table('tasks')->where('user_id', '=', $id)->whereIn('id', $ids)->delete();

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($delete_selected) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }


    /**
     * Function for updating completed value to 1(true)
     * @param Request $request [http request with data]
     * @return json
     */
    public function completeTask(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;

            $task_name = $request->task_name;
            $completed = DB::table('tasks')
                ->where('user_id', '=', $id)
                ->where('task_name', $task_name)
                ->update(['completed' => 1]);

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($completed) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }

    /**
     * Function for updating favorited value to 1(true)
     * @param Request $request [http request with data]
     * @return json
     */
    public function favoriteTask(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;

            $task_name = $request->task_name;
            $favorited = DB::table('tasks')
                ->where('user_id', '=', $id)
                ->where('task_name', $task_name)
                ->update(['favorited' => 1]);

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($favorited) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }

    /**
     * Function for deleting task by provided name
     * @param Request $request [http request with data]
     * @return json
     */
    public function deleteTask(Request $request)
    {

        if (Auth::check()) {

            $id = Auth::user()->id;

            $task_name = $request->task_name;
            $delete = DB::table('tasks')
                ->where('user_id', '=', $id)
                ->where('task_name', $task_name)
                ->delete();

            $tasks = DB::table('tasks')->where('user_id', '=', $id)->orderBy('created_at', 'desc')->get();

            if ($delete) {
                return response()->json(['success' => true, 'tasks' => $tasks]);

            } else {
                return response()->json(['success' => false]);
            }

        } else {

            return response()->json(['success' => false]);
        }


    }


}
