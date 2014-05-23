module Api
  class RecipesController < ApiController
    def index
      @recipes = Recipe.all
      respond_to do |format|
        format.html
        format.json { render json: @recipes }
      end
    end

    def create
      @recipe = current_user.owned_recipes.new(recipe_params)
      debugger
      if @recipe.save
        render json: @recipe
      else
         render json: { errors: @recipe.errors.full_messages }, status: 422
      end
    end

    def show
      @recipe = Recipe.find(params[:id])
      render partial: "api/recipes/recipe", locals: { recipe: @recipe }
    end

    def update
      @recipe = Recipe.find(params[:id])
      if @recipe.update_attributes(recipe_params)
        render json: @recipe
      else
        render json: { errors: @recipe.errors.full_messages }, status: 422
      end
    end

    private
    def recipe_params
      params.require(:recipe)
        .permit(:title, :photo_url, steps_attributes: [:body, :rank],
              ingredient_entries_attributes: [:ingredient_name, :rank, :amount, :unit, :fraction])
    end
  end
end
