<?php

use App\Http\Controllers\TodoListController;
use App\Http\Controllers\TodoItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/lists', [TodoListController::class, 'indexAction']);
Route::post('/lists', [TodoListController::class, 'storeAction']);
Route::get('/lists/{id}', [TodoListController::class, 'showAction']);
Route::put('/lists/{id}', [TodoListController::class, 'updateAction']);
Route::delete('/lists/{id}', [TodoListController::class, 'destroyAction']);

Route::post('/items', [TodoItemController::class, 'storeAction']);
Route::put('/items/{id}', [TodoItemController::class, 'updateAction']);
Route::delete('/items/{id}', [TodoItemController::class, 'destroyAction']);
