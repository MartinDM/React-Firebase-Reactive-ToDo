export PATH=/usr/local/bin:$PATH
# Generated for envman. Do not edit.
[ -s "$HOME/.config/envman/load.sh" ] && source "$HOME/.config/envman/load.sh"

export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init - zsh)"export PATH="$HOME/.gem/ruby/2.6.3/bin:$PATH"
export PATH="$HOME/.gem/ruby/2.6.3/bin:$PATH"

function kp() { lsof -i TCP:$1 | grep LISTEN | awk '{print $2}' | xargs kill -9 }

alias s='npm run start'