// components/CategoryForm.tsx

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from './ui/button';

// Define the API response data types
interface Category {
    id: number;
    name: string;
}
interface SubCategory {
    id: number;
    name: string;
}

interface Property {
    id: number;
    name: string;
    options: Option[]; // Add options field
}

interface Option {
    id: number;
    name: string;
}

const CategoryForm = () => {
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<string>('');
    const [selectedoptions, setSelectedoptions] = useState<string>('');
    const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<number | null>(null); // Use number type for selectedMainCategoryId

    // Create an instance of axios with common headers
    const api = axios.create({
        baseURL: 'https://staging.mazaady.com/api/v1/',
        headers: {
            'private-key': `B1+Di1@#C1{314@^XG1Uj%H1h%1@I2E@25@;`,
        },
    });

    useEffect(() => {
        // Fetch main categories from the API using the configured axios instance
        api.get<{ data: { categories: Category[] } }>('get_all_cats')
            .then((response: AxiosResponse) => {
                const categories = response.data.data.categories;
                setMainCategories(categories);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Fetch subcategories when a main category is selected
        console.log(selectedMainCategoryId)
        if (selectedMainCategoryId !== null) {
            api
                .get<{ data: { subcategories: SubCategory[] } }>(
                    `properties?cat=100`
                )
                .then((response: AxiosResponse) => {
                    setSubCategories(response.data.data);
                    console.log(subCategories)
                    setSelectedoptions(response.data.data.options)
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setSubCategories([]);
        }
    }, [selectedMainCategoryId]); // Pass selectedMainCategoryId as a dependency

    useEffect(() => {
        // Fetch properties when a subcategory is selected
        console.log(selectedSubCategory)
        if (selectedSubCategory !== null) {
            api
                .get<{ data: { properties: Property[] } }>(
                    `get-options-child/${selectedSubCategory}`
                )
                .then((response: AxiosResponse) => {
                    setProperties(response.data.data);
                    console.log(properties)
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setProperties([]);
        }
    }, [selectedSubCategory]);

    const handleMainCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value); // Get the selected main category ID
        setSelectedMainCategoryId(selectedId); // Update the selected main category ID
        setSelectedSubCategory(null); // Reset selectedSubCategory
        setSelectedProperty('');
    };

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedID = Number(event.target.value);
        setSelectedSubCategory(selectedID);
        setSelectedProperty('');
    };

    const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProperty(event.target.value);
    };

    return (
        <div className="space-y-4">
            <div>
                <label>Main Category</label>
                <select
                    value={selectedMainCategoryId || ''}
                    onChange={handleMainCategoryChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Main Category</option>
                    {mainCategories.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Sub Category</label>
                <select
                    value={selectedSubCategory || ''}
                    onChange={handleSubCategoryChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id.toString()}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Property</label>
                <select
                    value={selectedProperty}
                    onChange={handlePropertyChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                        <option key={property.id} value={property.id.toString()}>
                            {property.name}
                        </option>
                    ))}
                    <option value="other">Other</option>
                </select>
            </div>

            {selectedProperty === 'other' && (
                <div>
                    <label>Other Property Value</label>
                    <input
                        type="text"
                        placeholder="Enter other property value"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            )}
            <Button type="submit">Submit</Button>
        </div>
    );
};

export default CategoryForm;
