module StepsHelper
  def require_recipe_owner
    recipe = Recipe.find(params[:recipe_id])
    flash[:errors] = ["Only the recipe owner can edit a recipe"]
    redirect_to root_url unless recipe.owner == current_user
  end
end
