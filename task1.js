async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  const postsContainer = document.getElementById('posts');

  posts.forEach(post => {
      const postCol = document.createElement('div');
      postCol.classList.add('col-md-4');

      const postDiv = document.createElement('div');
      postDiv.classList.add('post', 'card', 'mb-4');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = post.title;
      cardBody.appendChild(title);

      const body = document.createElement('p');
      body.classList.add('card-text');
      body.textContent = post.body;
      cardBody.appendChild(body);

      const commentsButton = document.createElement('button');
      commentsButton.classList.add('btn', 'btn-primary');
      commentsButton.textContent = 'Show Comments';
      commentsButton.addEventListener('click', () => toggleComments(post.id, postDiv, commentsButton));
      cardBody.appendChild(commentsButton);

      const commentsDiv = document.createElement('div');
      commentsDiv.classList.add('comments');
      cardBody.appendChild(commentsDiv);

      postDiv.appendChild(cardBody);
      postCol.appendChild(postDiv);
      postsContainer.appendChild(postCol);
  });
}


async function fetchComments(postId, postDiv) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const comments = await response.json();
  const commentsDiv = postDiv.querySelector('.comments');
  commentsDiv.innerHTML = '';

  comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('border', 'p-3', 'mb-2', 'bg-light');
      commentDiv.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
      commentsDiv.appendChild(commentDiv);
  });
}


async function toggleComments(postId, postDiv, button) {
  const commentsDiv = postDiv.querySelector('.comments');
  
  if (commentsDiv.style.display === 'none') {
      await fetchComments(postId, postDiv);
      commentsDiv.style.display = 'block';
      button.textContent = 'Hide Comments';
  } else {
      commentsDiv.style.display = 'none';
      button.textContent = 'Show Comments';
  }
}

document.addEventListener('DOMContentLoaded', fetchPosts);