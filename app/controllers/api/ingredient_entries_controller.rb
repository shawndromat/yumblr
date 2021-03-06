module Api
  class IngredientEntriesController < ApiController
    include StepsHelper
    before_action :require_recipe_owner

    def create
      @ingredient_entry = IngredientEntry.new(ingredient_entry_params)
      if @ingredient_entry.save
        render partial: "api/ingredient_entries/ingredient_entry",
               locals: { entry: @ingredient_entry }
      else
        render json: { errors: @ingredient_entry.errors.full_messages }, status: 422
      end
    end

    def update
      
      @ingredient_entry = IngredientEntry.find(params[:id])
      if @ingredient_entry.update_attributes(ingredient_entry_params)
        render partial: "api/ingredient_entries/ingredient_entry",
               locals: { entry: @ingredient_entry }
      else
        render json: { errors: @ingredient_entry.errors.full_messages }, status: 422
      end
    end

    def destroy
      @ingredient_entry = IngredientEntry.find(params[:id])
      @ingredient_entry.try(:destroy)
      render partial: "api/ingredient_entries/ingredient_entry",
             locals: { entry: @ingredient_entry }
    end

    private
    def ingredient_entry_params
      permitted_params = [:id, :rank, :amount, :fraction,
                          :unit, :ingredient_name, :recipe_id]
      params.require(:ingredient_entry).permit(*permitted_params)
    end
  end
end
