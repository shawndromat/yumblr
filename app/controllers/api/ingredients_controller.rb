module Api
  class IngredientsController < ApiController
    def index
      @ingredients = Ingredient.all
      render json: @ingredients
    end

    def create
      @ingredient = Ingredient.new(params[:ingredient])
    end
  end
end
