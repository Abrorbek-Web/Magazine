"use client";

import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("carts");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        return parsedCart.map((product: ProductType) => ({
          ...product,
          quantity: product.quantity || 1,
        }));
      }
    }
    return [];
  });

  const removeProduct = (id: number) => {
    const updatedCart = products.filter((product) => product.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("carts", JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
  };

  const handleIncrement = (id: number) => {
    const updatedCart = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 0) + 1,
        };
      }
      return product;
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("carts", JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
  };

  const handleDecrement = (id: number) => {
    const existProduct = products.find((product) => product.id === id);

    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedCart = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: (product.quantity || 0) - 1,
          };
        }
        return product;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(updatedCart));
      }
      setProducts(updatedCart);
    }
  };

  useEffect(() => {
    const total = products.reduce((acc, item) => {
      return acc + item.price * (item.quantity || 1);
    }, 0);

    setTotal(total);
  }, [products]);

  return (
    <>
      {products.length ? (
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <div className="relative w-52">
                    <CustomImage product={product} fill />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center text-sm my-4">
                        <p>{product?.rating.rate}</p>
                        {product?.rating.rate && (
                          <div className="flex items-center ml-2 mr-6">
                            {Array.from(
                              {
                                length: Math.floor(product.rating.rate),
                              },
                              (_, i) => (
                                <StarIcon
                                  key={i}
                                  className="h-4 w-4 text-yellow-500"
                                />
                              )
                            )}
                            {Array.from(
                              {
                                length: 5 - Math.floor(product.rating.rate),
                              },
                              (_, i) => (
                                <StarIconOutline
                                  key={i}
                                  className="h-4 w-4 text-yellow-500"
                                />
                              )
                            )}
                          </div>
                        )}
                        <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                          See all {product?.rating.count} reviews
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={product.quantity || 1}
                          min="1"
                          onChange={(e) => {
                            const newQuantity = Math.max(1, parseInt(e.target.value, 10));
                            const updatedCart = products.map((p) =>
                              p.id === product.id ? { ...p, quantity: newQuantity } : p
                            );
                            if (typeof window !== "undefined") {
                              localStorage.setItem("carts", JSON.stringify(updatedCart));
                            }
                            setProducts(updatedCart);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
          <div className="text-center">
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
              Shopping cart is empty
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;