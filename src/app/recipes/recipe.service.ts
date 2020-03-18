import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tuna Tartare',
      'A simple and healthy tuna tartare recipe that will be sure to impress anyone!',
      'https://choosingchia.com/jessh-jessh/uploads/2015/03/tunatarare.jpg',
      [new Ingredient('Tuna', 1), new Ingredient('Avocado', 2)]
    ),
    new Recipe(
      'Beef Steak',
      'This grilled steak is flavorful, juicy, and tender. You won’t believe it’s not from an upscale',
      'https://foremangrillrecipes.com/wp-content/uploads/2013/06/featured-Foreman-Grill-Beef-Steak.jpg',
      [new Ingredient('Beef', 1), new Ingredient('French Fries', 25)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
