# [WIP] GH deck

GH deck is an application to watch GitHub notification easily.

## How to develop

1. Install draft: https://github.com/Azure/draft/blob/master/docs/getting-started.md

2. Create your own OAuth application: https://github.com/settings/applications/new

    Homepage URL: http://gh-deck.localhost
    Authorization callback URL: http://gh-deck.localhost/auth/github

3. Clone this repository

      $ git clone https://github.com/mtsmfm/gh-deck /path/to/gh-deck

4. Create draft.toml

      $ cp draft.toml.example draft.toml

5. Fill your draft.toml

      $ open draft.toml
