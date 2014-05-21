class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
    # respond_to do |format|
    #   format.html
    #   format.json { }
    # end
    render json: @recipes
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      render json: @recipe
    else
       render json: { errors: @recipe.errors.full_messages }, status: 422
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe
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
    require(:recipe).permit(:title, :owner_id, :photo_url)
  end
end
