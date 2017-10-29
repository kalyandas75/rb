import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Mutton Biriyani',
      'Kolkata style mutton biriyani. Its awesome!',
      'http://lh5.ggpht.com/-GN5dz3ufH68/UjFB2ZKqzQI/AAAAAAAAD3c/8sXZk1dfkQ8/IMG_1840_thumb%25255B2%25255D.jpg?imgmax=800',
      [
        new Ingredient('Mutton', 1),
        new Ingredient('Rice', 250)
      ]),
    new Recipe('Mix Vegetables',
      'A source of healthy and tasty food?',
      'http://currytadka.in/wp-content/uploads/2016/01/MIX-VEG.jpg',
      [
        new Ingredient('Carrots', 2),
        new Ingredient('Peas', 100),
        new Ingredient('Cauliflower', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
