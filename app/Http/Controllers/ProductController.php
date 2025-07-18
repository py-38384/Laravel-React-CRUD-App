<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use App\Http\Requests\ProductFormRequest;
use Laravel\Pail\ValueObjects\Origin\Console;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int)($request->perPage ?? 5);
        $query = Product::query();
        $productCount = 0;
        if($request->get('search')){
            $search_query = $request->get('search');
            $query = $query->where('name','like','%'. $search_query .'%');
            $productCount = $query->count();
        }
        if($perPage === -1){
            $products = $query->latest()->paginate(Product::count())->withQueryString();
        } else {
            $products = $query->latest()->paginate($perPage)->withQueryString();
        }
        foreach ($products as $product) {
            $product->created_at_formated = $product->created_at->format("d M y");
        }
        return Inertia::render('products/index',['products' => $products, 'filters' => $request->only(['search','perPage']), 'count' => $productCount]);
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
        return Inertia::render('products/product-form',[
            'product' => $product,
            'is_edit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {
        if($product){
            if($request->file('featured_image')){
                $featured_image = $request->file('featured_image');
                $featured_image_original_name = $featured_image->getClientOriginalName();
                $featured_image_with_path = $featured_image->store('products','public');

                $path_with_file_name = storage_path("app/public/{$product->feature_image}");
                if(File::exists($path_with_file_name)){
                    unlink($path_with_file_name);
                }
            } else {
                $featured_image_with_path = $product->feature_image;
                $featured_image_original_name = $product->feature_image_original_name;
            }
            $updated = $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'feature_image' => $featured_image_with_path,
                'feature_image_original_name' => $featured_image_original_name
            ]);
            if($updated){
                return redirect()->route('products.index')->with('success', 'Product update successfully');
            }
            return redirect()->back()->with('error', 'Unable to update product');
        }
        return redirect()->back()->with('error', 'Unable to find product');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if($product){
            $path_with_file_name = storage_path("app/public/{$product->feature_image}");
            if(File::exists($path_with_file_name)){
                unlink($path_with_file_name);
            }
            $product->delete();
            return redirect()->route('products.index')->with('success', 'Product delete successfully');
        }
        return redirect()->back()->with('error', 'Unable to find product');
    }
}
