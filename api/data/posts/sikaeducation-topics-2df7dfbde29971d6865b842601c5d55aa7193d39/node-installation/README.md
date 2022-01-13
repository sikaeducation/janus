# Installing Node

There are a lot of ways to install node, and most of them are wrong. You should **never** have to `sudo npm install` **anything**. NPM packages (and their dependencies) can be published by anyone, and installing them with `sudo` gives all of those people administrative access to your computer.

To see if you already have node installed, run `which node`. If you see nothing, you don't have it installed. If you see anything other than a path that looks like `/home/username/.nvm/versions/node/v12.19.1/bin/node` (or you get `EACCES` errors when installing packages), it's probably installed wrong.

## To uninstall node

Using the directions from [this Stack Overflow answer](https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x?rq=1), try to purge it from your system. Try:

```bash
sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
sudo rm -rf /opt/local/bin/node /opt/local/include/node /opt/local/lib/node_modules
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node.1 /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm ~/.nvm
brew uninstall --force node
```

## To install node correctly

Use [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install node
```

You should be able to install node packages without `sudo` now!
