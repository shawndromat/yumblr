module StepsHelper
  def require_recipe_owner
    recipe = Recipe.find(params[:recipe_id])
    redirect_to root_url unless recipe.owner == current_user
  end
end
