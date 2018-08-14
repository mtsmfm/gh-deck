# [WIP] GH deck

GH deck is an application to watch GitHub notification easily.

## How to develop

1.  Create k8s cluster

2.  Install Helm: https://docs.helm.sh/using_helm/#installing-helm

3.  Install nginx-ingress

        helm install stable/nginx-ingress

4.  Create your own OAuth application: https://github.com/settings/applications/new

        Homepage URL: http://gh-deck.localhost
        Authorization callback URL: http://gh-deck.localhost/auth/github

5.  Clone this repository

        $ git clone https://github.com/mtsmfm/gh-deck /path/to/gh-deck

6.  Save your own OAuth credentials

        $ echo <your github client id> > .secrets/githubClientId
        $ echo <your github client secret> > .secrets/githubClientSecret

7.  Install Kustomize: https://github.com/kubernetes-sigs/kustomize

8.  Build Docker image

        bin/docker-build

9.  Deploy

        bin/deploy-dev
