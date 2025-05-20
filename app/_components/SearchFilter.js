"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RatingSelector from "./RatingSelector";

const SearchFilter = ({ searchParams }) => {
  const router = useRouter();
  const [rating, setRating] = useState(searchParams?.ratingsAverage || "");
  const [minPrice, setMinPrice] = useState(searchParams?.price?.gte || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.price?.lte || "");
  const [sort, setSort] = useState(searchParams?.sort || "");
  const [category, setCategory] = useState(searchParams?.mainCategory || "");
  const [subCategory, setSubCategory] = useState(
    searchParams?.subCategories || ""
  );
  const [stock, setStock] = useState(""); // New state for stock filtering

  // Categories with main and subCategories
  const categories = [
    { mainCategory: "all", subCategories: ["all"] },
    {
      mainCategory: "computers",
      subCategories: ["desktop computers", "laptop", "tablets", "all"],
    },
    {
      mainCategory: "fashion",
      subCategories: ["mens-clothing", "womens-clothing", "accessories", "all"],
    },
    {
      mainCategory: "home-appliances",
      subCategories: ["refrigerators", "microwaves", "washing-machines", "all"],
    },
  ];

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  // Capitalize the first letter of each word
  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    // Update subCategory options based on the selected mainCategory
    const selectedCategory = categories.find(
      (cat) => cat.mainCategory === category
    );
    if (selectedCategory) {
      setSubCategoryOptions(selectedCategory.subCategories);
    } else {
      setSubCategoryOptions([]);
    }
  }, [category]);

  const filters = [
    { key: "ratingsAverage[gte]", value: rating },
    { key: "price[gte]", value: minPrice },
    { key: "price[lte]", value: maxPrice },
    { key: "sort", value: sort },
    { key: "mainCategory", value: category === "all" ? "" : category },
    { key: "subCategories", value: subCategory === "all" ? "" : subCategory },
    { key: "stock[gte]", value: stock === "inStock" ? 1 : "" }, // Stock filter logic
  ];

  useEffect(() => {
    //when search changes reset filters
    setRating(searchParams?.ratingsAverage || "");
    setMinPrice(searchParams?.price?.gte || "");
    setMaxPrice(searchParams?.price?.lte || "");
    setSort(searchParams?.sort || "");
    setCategory(searchParams?.mainCategory || "");
    setSubCategory(searchParams?.subCategories || "");
    setStock("");
  }, [searchParams?.search]);

  const handleFilterChange = () => {
    const newQuery = { ...searchParams };
    filters.forEach(({ key, value }) => {
      if (value) {
        newQuery[key] = value;
      } else {
        delete newQuery[key]; //remove param if no value is selected (all too removes)
      }
    });

    const queryString = new URLSearchParams(newQuery).toString();
    router.push(`/search?${queryString}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 items-center justify-center my-10 mx-auto px-4 py-6 shadow-lg rounded-lg w-[90%] bg-base-200">
      <div className="flex flex-col">
        <label className="font-bold mb-2">Min Price</label>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold mb-2">Max Price</label>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold mb-2">Sort By</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
        >
          <option value="" disabled>
            Sort By
          </option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          <option value="ratingsAverage">Rating (Low to High)</option>
          <option value="-ratingsAverage">Rating (High to Low)</option>
        </select>
      </div>

      {/* Main Category Dropdown */}
      <div className="flex flex-col">
        <label className="font-bold mb-2 ">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
        >
          <option value="" disabled>
            Category
          </option>
          {categories?.map((cat) => (
            <option key={cat.mainCategory} value={cat.mainCategory}>
              {capitalize(cat.mainCategory)}
            </option>
          ))}
        </select>
      </div>

      {/* SubCategory Dropdown */}
      <div className="flex flex-col">
        <label className="font-bold mb-2 ">SubCategory</label>
        <select
          id="sub-Category"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="select px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
          disabled={!subCategoryOptions.length} //disable if no subCategory options available
        >
          <option value="" disabled>
            {subCategoryOptions.length
              ? "SubCategory"
              : "Not available"}
          </option>
          {subCategoryOptions?.map((subCat) => (
            <option key={subCat} value={subCat}>
              {capitalize(subCat)}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Filter */}
      <div className="flex flex-col">
        <label className="font-bold mb-2">Stock</label>
        <select
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="select px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100 transition-all duration-200"
        >
          <option value="" disabled>
            Stock
          </option>
          <option value="inStock">Only In Stock</option>
        </select>
      </div>

      <div className="col-span-3">
        <RatingSelector rating={rating} setRating={setRating} />
      </div>

      <div className="flex justify-center col-span-3 ">
        <button
          className="btn px-6 py-2 bg-green-500 text-base-content font-semibold !rounded-md hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
          onClick={handleFilterChange}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLineJoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-filter-search w-6 h-6"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M20.2 20.2l1.8 1.8" />
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
