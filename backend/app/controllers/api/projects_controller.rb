module Api
  class ProjectsController < ApplicationController
    def index
      render json: PROJECTS_STORE
    end

    def create
      project = {
        id: SecureRandom.uuid,
        title: project_params[:title].to_s.strip,
        description: project_params[:description].to_s.strip,
      }

      if project[:title].empty? || project[:description].empty?
        render json: { error: "title and description are required" }, status: :unprocessable_entity
        return
      end

      PROJECTS_STORE.unshift(project)
      render json: project, status: :created
    end

    private

    def project_params
      ActionController::Parameters.new(
        request.request_parameters.slice("title", "description"),
      ).permit(:title, :description)
    end
  end
end
