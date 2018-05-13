class ImportGithubReceivedEventsJob < ApplicationJob
  queue_as :default

  def perform(user)
    Rails.logger.info("ImportGithubReceivedEventsJob #{user}")

    client = Octokit::Client.new(access_token: user.token)
    events = client.received_events(client.login)

    ApplicationRecord.transaction do
      GithubApiResponse.record_last_response!(user: user, last_response: client.last_response)

      events.each do |event|
        gh_repo = GithubRepository.find_or_initialize_by(github_id: event[:repo][:id]).tap do |r|
          r.update!(name: event[:repo][:name])
        end

        gh_org = GithubOrganization.find_or_initialize_by(github_id: event[:org][:id]).tap do |o|
          o.update!(login: event[:org][:login], avatar_url: event[:org][:avatar_url])
        end if event[:org]

        gh_user = GithubUser.find_or_initialize_by(github_id: event[:actor][:id]).tap do |u|
          u.update!(login: event[:actor][:login], avatar_url: event[:actor][:avatar_url])
        end

        GithubEvent.find_or_initialize_by(github_id: event[:id], user: user).tap do |e|
          e.update!(
            github_type: event[:type],
            github_created_at: event[:created_at],
            payload: event[:payload],
            github_organization: gh_org,
            github_user: gh_user,
            github_repository: gh_repo
          )
        end
      end
    end
  end
end
