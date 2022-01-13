# Installing Docker

## Desktop

On a conventional machine, go to [the Docker page](https://www.docker.com/get-started) and download/run the installer. Boot up the Docker GUI once to start the daemon.

## Server

On a headless Ubuntu machine:

```bash
sudo apt update
sudo apt remove docker docker-engine docker.io containerd runc # Old runtimes
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs)  stable"
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
