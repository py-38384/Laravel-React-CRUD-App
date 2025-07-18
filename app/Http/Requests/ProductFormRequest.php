<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $validateRules = [
            "name"=> ["required","string","max:255"],
            "description" => ["required","string","max:1000"],
            "price" => ["required","numeric","min:0"],
            "featured_image" => ["image","mimes:jpeg,png,jpg,gif","max:2048"],
        ];
        if($this->routeIs('products.update')){
            array_unshift($validateRules['featured_image'],"nullable");
        } 
        if($this->routeIs('products.store')){
            array_unshift($validateRules['featured_image'],"required");
        }
        return $validateRules;
    }
    /**
     * Summary of messages
     * Function: messages
     * @return array
     */
    public function messages(): array
    {
        return [
            "name.required" => "Please enter the product name",
            "description.required" => "Please enter the product description",
            "price.required" => "Please enter the product price",
        ];
    }
}
