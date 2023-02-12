const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    if (title && description) {
        const response = await fetch('/api/blogPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to post');
        }
    }
};

document.querySelector('.blogPost-form').addEventListener('submit', newPost);
