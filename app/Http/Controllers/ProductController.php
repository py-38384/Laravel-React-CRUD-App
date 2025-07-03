<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ProductFormRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get()->map(function ($product){
            return [
                "id" => $product->id,
                "name" => $product->name,
                "price" => $product->price,
                "description" => $product->description,
                "feature_image" => $product->feature_image,
                "feature_image_original_name" => $product->feature_image_original_name,
                "created_at" => $product->created_at->format("d M Y"),
            ];
        });
        // $products = Product::latest()->get();
        return Inertia::render('products/index',['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created product in storage.
     * @param ProductFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProductFormRequest $request)
    {
        try {
            if($request->file('featured_image')){
                $featured_image = $request->file('featured_image');
                $featured_image_original_name = $featured_image->getClientOriginalName();
                $featured_image_with_path = $featured_image->store('products','public');
            }
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'feature_image' => $featured_image_with_path,
                'feature_image_original_name' => $featured_image_original_name
            ]);
            if($product){
                return redirect()->route('products.index')->with('success', 'Product created successfully');
            }
            return redirect()->back()->with('error', 'Unable to create product');
        } catch (\Throwable $th) {
            Log::error('Product creation failed: '.$th->getMessage());
            return redirect()->back()->with('error', 'Unable to create product');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/product-form',[
            'product' => $product,
            'is_view' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
