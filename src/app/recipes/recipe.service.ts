import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tuna Tartare',
  //     'A simple and healthy tuna tartare recipe that will be sure to impress anyone!',
  //     'https://choosingchia.com/jessh-jessh/uploads/2015/03/tunatarare.jpg',
  //     [new Ingredient('Tuna', 1), new Ingredient('Avocado', 2)]
  //   ),
  //   new Recipe(
  //     'Beef Steak',
  //     'This grilled steak is flavorful, juicy, and tender. You won’t believe it’s not from an upscale',
  //     'https://foremangrillrecipes.com/wp-content/uploads/2013/06/featured-Foreman-Grill-Beef-Steak.jpg',
  //     [new Ingredient('Beef', 1), new Ingredient('French Fries', 25)]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) {}

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
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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
