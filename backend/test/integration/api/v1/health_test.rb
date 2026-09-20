require "test_helper"

module Api
  module V1
    class HealthTest < ActionDispatch::IntegrationTest
      test "returns ok status as JSON" do
        get api_v1_health_url, as: :json

        assert_response :success
        assert_equal "application/json", response.media_type

        body = response.parsed_body
        assert_equal "ok", body["status"]
        assert_equal "backend", body["service"]
        assert body["time"].present?, "expected the response to include a timestamp"
      end
    end
  end
end
