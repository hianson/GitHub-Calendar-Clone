class PracticeSessionsController < ApplicationController
  def index
    @practice_sessions = PracticeSession.all
    json_response(@practice_sessions)

  end
end
