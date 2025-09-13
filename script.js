fetch('posts.json')
    .then(res => res.json())
    .then(posts => {
        const listDiv = document.querySelector('#posts-list ul');
        const contentDiv = document.getElementById('post-content');

        posts.forEach(post => {
            let li = document.createElement('li');

            // Date element
            let date = document.createElement('date');
            date.textContent = new Date(post.date).toLocaleDateString();

            // Link element
            let link = document.createElement('a');
            link.href = "#";
            link.textContent = post.title;

            link.onclick = (e) => {
                e.preventDefault();
                loadPost(post.file);
            };

            li.appendChild(date);
            li.appendChild(link);
            listDiv.appendChild(li);
        });

        function loadPost(filename) {
            fetch('posts/' + filename)
                .then(res => res.text())
                .then(md => {
                    contentDiv.innerHTML = marked.parse(md);
                });
        }
    });