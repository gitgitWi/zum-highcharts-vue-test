git clone https://github.com/asdf-vm/asdf.git ~/.asdf

# install Nodejs
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs lts
asdf global nodejs lts
echo "Node installed!"
node -v

npm i -g npm
npm i -g yarn

yarn global add pretty-quick lint-staged eslint prettier husky @vue/cli
npx husky set .husky/pre-commit "npx pretty-quick --staged"
npx husky add .husky/pre-commit "npx lint-staged"
