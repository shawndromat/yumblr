module Api
  class StepsController < ApiController
    def create
      @step = Step.new(step_params)
      if @step.save
        render partial: "api/steps/step", locals: { step: @step }
      else
        render json: { errors: @step.errors.full_messages }, status: 422
      end
    end

    def update
      @step = Step.find(params[:id])
      if @step.update_attributes(step_params)
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
    def step_params
      params.require(:step).permit(:body, :id, :rank, :recipe_id, :timer)
    end
  end
end
