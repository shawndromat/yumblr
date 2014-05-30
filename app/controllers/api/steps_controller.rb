module Api
  class StepsController < ApiController
    include StepsHelper

    before_action :require_recipe_owner, only: [:destroy]

    def create
      @step = Step.new(owner_step_params)
      if @step.save
        render partial: "api/steps/step", locals: { step: @step }
      else
        render json: { errors: @step.errors.full_messages }, status: 422
      end
    end

    def update
      @step = Step.find(params[:id])

      if current_user == @step.recipe.owner
        @step.update_attributes(owner_step_params)
      else
        @step.update_attributes(non_owner_step_params)
      end

      if @step.save
        render partial: "api/steps/step", locals: { step: @step }
      else
        render json: { errors: @step.errors.full_messages }, status: 422
      end
    end

    def destroy
      @step = Step.find(params[:id])
      @step.try(:destroy)
      render partial: "api/steps/step", locals: { step: @step }
    end

    private
    def owner_step_params
      params.require(:step).permit(:body, :id, :rank, :recipe_id, :timer)
    end

    def non_owner_step_params
      params.require(:step).permit(:timer, :video_url)
    end
  end
end
