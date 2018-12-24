export function APIRequest(who) {
  if (who === 'followers') {
    return fetch('https://api.github.com/users/skunal8197/followers').then(res => res.json())
  }

  if (who === 'following') {
    return fetch('https://api.github.com/users/skunal8197/following').then(res => res.json())
  }

  if (who === 'repos') {
    return fetch('https://api.github.com/users/skunal8197/repos').then(res => res.json())
  }

  if (who === 'profile') {
    return fetch('https://api.github.com/users/skunal8197').then(res => res.json())
  }

  else {
    return 'no argument provided'
  }
}
