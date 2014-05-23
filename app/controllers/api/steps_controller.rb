module Api
  class StepsController < ApiController
    def update
      @step = Step.find(params[:id])
      if @step.update_attributes(step_params)
        render partial: "api/steps/step", locals: { step: @step }
      else
        render json: { errors: @step.errors.full_messages }, status: 422
      end
    end

    private
    def step_params
      params.require(:step).permit(:body, :id, :rank)
    end
  end
end
