import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import { ActivityT } from "../types";


export const Form = () => {

    const [activity, setActivity] = useState<ActivityT>({
        category: 1,
        name: '',
        calories: 0,
    });

    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        });

    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const isValidActivity = () => {
        const {name, calories} = activity;
        return name.trim() !== '' && calories > 0;
    }


    return (

        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category</label>
                <select 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category =>(
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activity: </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Food, Orange Juice, Salad, Exercise, Jumping rope, Bicycle"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories: </label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. 300 or 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
                <input 
                    type="submit" 
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activity.category === 1 ? 'Save food' : 'Save exercise'}
                    disabled={!isValidActivity()}
                />
            </div>
        </form>
        
    );
}
