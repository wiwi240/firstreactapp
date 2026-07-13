require "test_helper"

class ProjectsFlowTest < ActionDispatch::IntegrationTest
  test "lists projects" do
    get "/api/projects"

    assert_response :success
    body = JSON.parse(response.body)

    assert_kind_of Array, body
    assert body.first["title"].present?
  end

  test "creates a project" do
    assert_difference -> { PROJECTS_STORE.length }, 1 do
      post "/api/projects",
        params: { title: "Projet test", description: "Description test" },
        as: :json
    end

    assert_response :created
    body = JSON.parse(response.body)

    assert_equal "Projet test", body["title"]
    assert_equal "Description test", body["description"]
  end
end
