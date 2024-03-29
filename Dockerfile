FROM --platform=linux/amd64 debian:stable-slim

RUN apt update
RUN apt-get update

RUN apt-get install -y \
  locales zsh curl wget unzip sudo git \
  dirmngr gpg gawk
RUN apt autoremove -y

RUN rm -rf /var/lib/apt/lists/* && localedef -i ko_KR -c -f UTF-8 -A /usr/share/locale/locale.alias ko_KR.UTF-8
ENV LANG ko_KR.UTF-8
ENV TZ="Asia/Seoul"

RUN git config --global init.defaultBranch main
RUN git config --global user.name "gitgitWi"
RUN git config --global user.email "wiii@kakao.com"

RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

COPY ./.setup/.zshrc /root/.zshrc

# install asdf
RUN git clone https://github.com/asdf-vm/asdf.git $HOME/.asdf
RUN echo ". $HOME/.asdf/asdf.sh" >>$HOME/.zshrc

RUN chsh -s /usr/bin/zsh
