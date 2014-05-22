module Api
  class IngredientsController < ApiController
    def index
      @ingredients = Ingredient.all
    end

    def create
      @ingredient = Ingredient.new(params[:ingredient])
    end
  end
end
