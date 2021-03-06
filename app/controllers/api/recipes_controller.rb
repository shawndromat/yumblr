module Api
  class RecipesController < ApiController
    before_action :require_login
    before_action :require_owner, only: [:update]

    def index
      @recipes = Recipe.public.sort_by{|recipe| recipe.created_at}.reverse
      respond_to do |format|
        format.html
        format.json { render jbuilder: @recipes }
      end
    end

    def create
      @recipe = current_user.owned_recipes.new(recipe_params)

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

    def search
      @recipes = Recipe.find_by_ingredient(params[:ingredient_name])
      render "api/recipes/index", locals: {recipes: @recipes}
    end

    def private_recipes
      @recipes = Recipe.private
      render "api/recipes/index", locals: {recipes: @recipes}
    end

    private
    def recipe_params
      params.require(:recipe)
        .permit(:title, :photo_url, :private, steps_attributes: [:body, :rank],
              ingredient_entries_attributes: [:ingredient_name, :rank, :amount, :unit, :fraction])
    end

    def require_owner
      recipe = Recipe.find(params[:id])
      redirect_to root_url unless recipe.owner == current_user
    end
  end
end
